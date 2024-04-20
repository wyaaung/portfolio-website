import {
  TableOfContentItem,
  TableOfContentInlineProps,
  NestedTableOfContentItem,
} from '@/types/TableOfContent';

const createNestedList = (items: TableOfContentItem[]): NestedTableOfContentItem[] => {
  const nestedList: NestedTableOfContentItem[] = [];
  const stack: NestedTableOfContentItem[] = [];

  items.forEach((item) => {
    const newItem: NestedTableOfContentItem = { ...item };

    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }

    const parent = stack.length > 0 ? stack[stack.length - 1] : null;

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(newItem);
    } else {
      nestedList.push(newItem);
    }

    stack.push(newItem);
  });

  return nestedList;
};

const TableOfContentInline = ({
  tableOfContentItems,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
}: TableOfContentInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i');

  const filteredTableOfContent = tableOfContentItems.filter(
    (tableOfContentItem) =>
      tableOfContentItem.depth >= fromHeading &&
      tableOfContentItem.depth <= toHeading &&
      !re.test(tableOfContentItem.value)
  );

  const createList = (nestedTableofContentItems: NestedTableOfContentItem[] | undefined) => {
    if (!nestedTableofContentItems || nestedTableofContentItems.length === 0) {
      return null;
    }

    return (
      <ul className="mb-6">
        {nestedTableofContentItems.map((nestedTableofContentItem, index) => (
          <li key={index}>
            <a
              href={nestedTableofContentItem.url}
              className="not-prose border-b border-cyan-400 no-underline dark:border-cyan-500"
            >
              {nestedTableofContentItem.value}
            </a>
            {createList(nestedTableofContentItem.children)}
          </li>
        ))}
      </ul>
    );
  };

  const nestedTableOfContentItems = createNestedList(filteredTableOfContent);

  return (
    <>
      {asDisclosure ? (
        <details open={!collapse}>
          <summary className="ml-6 pb-2 pt-2 text-xl font-bold">Table of Contents</summary>
          <div className="ml-6">{createList(nestedTableOfContentItems)}</div>
        </details>
      ) : (
        createList(nestedTableOfContentItems)
      )}
    </>
  );
};

export default TableOfContentInline;

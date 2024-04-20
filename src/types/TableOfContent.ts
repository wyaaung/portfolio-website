export type TableOfContentItem = {
  value: string;
  url: string;
  depth: number;
};

export type TableOfContent = TableOfContentItem[];

export interface TableOfContentInlineProps {
  tableOfContentItems: TableOfContent;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
}

export interface NestedTableOfContentItem extends TableOfContentItem {
  children?: NestedTableOfContentItem[];
}

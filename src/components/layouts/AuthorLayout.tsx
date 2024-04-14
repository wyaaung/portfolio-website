import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthorLayout = ({ children }: Props) => {
  return (
    <div className="pt-8">
      <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">William (Wai Yan) Aung</h1>
          <h2 className="text-sm font-normal md:text-base">
            Software Engineer <span className="font-semibold">THG Plc.</span>
          </h2>
        </div>
        <div>Image</div>
      </div>
      <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-dark md:text-lg xl:col-span-2">
        {children}
      </div>
    </div>
  );
};

export default AuthorLayout;

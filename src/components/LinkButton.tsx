import React from 'react';

const LinkButton = ({
  href,
  ...rest
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  return (
    <a
      className="no-underline
  cursor-pointer
  bg-no-repeat 
  bg-gradient-to-r 
  from-primary-500 
  to-primary-500 
  [background-position:0_100%] 
  [background-size:100%_0.2em]
  hover:[background-size:100%_100%] 
  hover:text-white
  focus:[background-size:100%_100%] 
  motion-safe:transition-all
  motion-safe:duration-300 
  dark:from-primary-500 
  dark:to-primary-500"
      href={href}
      {...rest}
    />
  );
};

export default LinkButton;

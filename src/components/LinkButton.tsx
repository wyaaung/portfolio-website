import type React from 'react';

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
  from-cyan-500
  to-cyan-500
  [background-position:0_100%] 
  [background-size:100%_0.2em]
  hover:[background-size:100%_100%] 
  hover:text-white
  focus:[background-size:100%_100%] 
  motion-safe:transition-all
  motion-safe:duration-300 
  dark:from-cyan-500
  dark:to-cyan-500"
      href={href}
      {...rest}
    />
  );
};

export default LinkButton;

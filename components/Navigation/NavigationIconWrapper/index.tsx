import React from "react";

export const NavigationIconWrapper = React.forwardRef(
  ({ children, href }: { children: any; href?: string }, ref: any) => (
    <a ref={ref} href={href}>
      {children}
    </a>
  )
);

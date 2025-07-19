import React from "react";
import { cn } from "../../utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Session = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full h-dvh", className)} {...props}>
        {children}
      </div>
    );
  }
);

export default Session;

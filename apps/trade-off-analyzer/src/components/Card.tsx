import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

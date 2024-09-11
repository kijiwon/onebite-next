import { ReactNode } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <div>
        <div>서치바</div>
        {children}
      </div>
    </div>
  );
}

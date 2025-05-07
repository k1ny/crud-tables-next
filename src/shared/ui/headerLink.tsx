import Link from "next/link";
import { ReactNode } from "react";

type HeaderLinkProps = {
  name: string;
  icon?: ReactNode;
  href: string;
};

export const HeaderLink = ({ name, icon, href }: HeaderLinkProps) => {
  return (
    <Link
      href={`${href}`}
      className="flex gap-2 rounded-sm p-2 hover:bg-zinc-900 "
    >
      {name} {icon}
    </Link>
  );
};

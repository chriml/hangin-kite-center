import Link from "next/link";
import type { PublicRoute } from "@/content/site";

export function Breadcrumbs({ current, parent }: {
  current: string;
  parent?: { label: string; href: PublicRoute; scroll?: boolean };
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {parent && <li><Link href={parent.href} scroll={parent.scroll}>{parent.label}</Link></li>}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

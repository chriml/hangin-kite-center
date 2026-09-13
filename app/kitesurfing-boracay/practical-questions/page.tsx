import { BoracaySubpageContent } from "@/components/boracay-subpage";
import { boracaySubpages } from "@/content/boracay-guide";
import { buildMetadata } from "@/lib/seo";

const page = boracaySubpages.questions;
export const metadata = buildMetadata({ title: page.title, description: page.description, path: page.path });

export default function Page() {
  return <BoracaySubpageContent page={page} />;
}

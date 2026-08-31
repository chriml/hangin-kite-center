import { ServicePage } from "@/components/service-page";
import { islandPages } from "@/content/island-pages";
import { buildMetadata } from "@/lib/seo";

const content = islandPages.boracay;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function KitesurfingBoracayPage() {
  return <ServicePage content={content} />;
}

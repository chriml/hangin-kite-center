import { ServicePage } from "@/components/service-page";
import { islandPages } from "@/content/island-pages";
import { buildMetadata } from "@/lib/seo";

const content = islandPages.shop;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function ShopPage() {
  return <ServicePage content={content} />;
}

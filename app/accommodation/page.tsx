import { ServicePage } from "@/components/service-page";
import { islandPages } from "@/content/island-pages";
import { buildMetadata } from "@/lib/seo";

const content = islandPages.accommodation;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function AccommodationPage() {
  return <ServicePage content={content} />;
}

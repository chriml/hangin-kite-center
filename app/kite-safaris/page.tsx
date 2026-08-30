import { ServicePage } from "@/components/service-page";
import { waterPages } from "@/content/water-pages";
import { buildMetadata } from "@/lib/seo";

const content = waterPages.safaris;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function KiteSafarisPage() {
  return <ServicePage content={content} />;
}

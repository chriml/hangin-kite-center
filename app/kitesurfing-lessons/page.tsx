import { ServicePage } from "@/components/service-page";
import { waterPages } from "@/content/water-pages";
import { buildMetadata } from "@/lib/seo";

const content = waterPages.lessons;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function KitesurfingLessonsPage() {
  return <ServicePage content={content} />;
}

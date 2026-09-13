import { getLessonContactAction } from "@/content/site";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function LessonEnquiry({ course, className, label = "Book" }: { course: string; className: string; label?: string }) {
  const action = getLessonContactAction(course);
  return (
    <a className={className} href={action.href} target={action.target} rel={action.rel} aria-label={`${label === "Book" ? `Book ${course} via WhatsApp` : `${label} for ${course}`} (opens in a new tab)`}>
      <WhatsAppIcon />{label}
    </a>
  );
}

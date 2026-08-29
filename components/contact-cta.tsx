import { getWhatsAppUrl, siteConfig, type ContactContext } from "@/content/site";

export function ContactCta({
  context = "general",
  label = "Message us on WhatsApp",
  compact = false,
}: {
  context?: ContactContext;
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact ? "contact-actions contact-actions--compact" : "contact-actions"
      }
    >
      <a
        className="button button--coral"
        href={getWhatsAppUrl(context)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
      {!compact && <a href={`mailto:${siteConfig.email}`}>Email {siteConfig.email}</a>}
    </div>
  );
}

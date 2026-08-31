import {
  getPrimaryContactAction,
  siteConfig,
  type ContactContext,
  type PrimaryContactLabel,
} from "@/content/site";

export function ContactCta({
  context = "general",
  label = "message",
  compact = false,
}: {
  context?: ContactContext;
  label?: PrimaryContactLabel;
  compact?: boolean;
}) {
  const action = getPrimaryContactAction(context, label);

  return (
    <div
      className={
        compact ? "contact-actions contact-actions--compact" : "contact-actions"
      }
    >
      <a
        className="button button--coral"
        href={action.href}
        target={action.target}
        rel={action.rel}
      >
        {action.label}
      </a>
      {!compact && <a href={`mailto:${siteConfig.email}`}>Email {siteConfig.email}</a>}
    </div>
  );
}

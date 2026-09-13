import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { EmailIcon } from "@/components/email-icon";
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
        className="button button--coral button--whatsapp"
        href={action.href}
        aria-label={action.accessibleLabel}
        target={action.target}
        rel={action.rel}
      >
        <WhatsAppIcon />
        <span>{action.label}</span>
      </a>
      {!compact && (
        <a className="email-action" href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.email}`} title={`Email ${siteConfig.email}`}>
          <EmailIcon />
        </a>
      )}
    </div>
  );
}

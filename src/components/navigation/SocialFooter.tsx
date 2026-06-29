"use client";

import { SocialIcon, type SocialIconName } from "@/components/icons/SocialIcons";
import { WHATSAPP_JOIN_URL } from "@/data/contact";

const SOCIAL_LINKS: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "WhatsApp", href: WHATSAPP_JOIN_URL, icon: "whatsapp" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];

type SocialFooterVariant = "labeled" | "icons";

interface SocialFooterProps {
  className?: string;
  variant?: SocialFooterVariant;
}

export default function SocialFooter({
  className = "",
  variant = "labeled",
}: SocialFooterProps) {
  return (
    <nav
      className={`flex items-center justify-center ${className}`}
      aria-label="Redes sociales"
    >
      {SOCIAL_LINKS.map((link, index) => (
        <div key={link.label} className="flex items-center">
          {index > 0 && (
            <span
              className="mx-3 h-4 w-px bg-xamani-silver/25 sm:mx-5"
              aria-hidden="true"
            />
          )}
          <a
            href={link.href}
            target={link.href.includes("wa.me") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-2.5 opacity-70 transition-all duration-300 [-webkit-tap-highlight-color:transparent] hover:opacity-100"
            aria-label={link.label}
          >
            <SocialIcon
              name={link.icon}
              className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
            />
            {variant === "labeled" && (
              <span className="hidden font-archia text-[0.55rem] uppercase tracking-[0.25em] sm:inline sm:text-[0.6rem] sm:tracking-[0.3em]">
                {link.label}
              </span>
            )}
          </a>
        </div>
      ))}
    </nav>
  );
}

import Image from "next/image";

export const SOCIAL_ICON_SRC = {
  instagram: "/images/logo-instagram.png",
  whatsapp: "/images/logo-whats.png",
  tiktok: "/images/logo-tiktok.png",
  linkedin: "/images/logo-linkedin.png",
} as const;

export type SocialIconName = keyof typeof SOCIAL_ICON_SRC;

export function SocialIcon({
  name,
  className = "h-5 w-5",
}: {
  name: SocialIconName;
  className?: string;
}) {
  return (
    <Image
      src={SOCIAL_ICON_SRC[name]}
      alt=""
      width={20}
      height={20}
      className={`object-contain ${className}`}
      aria-hidden
    />
  );
}

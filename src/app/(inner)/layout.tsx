import InnerPageShell from "@/components/layout/InnerPageShell";
import ScrollToTop from "@/components/navigation/ScrollToTop";

export default function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTop />
      <InnerPageShell>{children}</InnerPageShell>
    </>
  );
}

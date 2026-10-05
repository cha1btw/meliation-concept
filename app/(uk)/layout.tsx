import "../globals.css";
import { uk } from "@/content/uk";
import { RootShell, buildMetadata } from "@/lib/layout";

export { viewport } from "@/lib/layout";
export const metadata = buildMetadata(uk, "/");

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="uk">{children}</RootShell>;
}

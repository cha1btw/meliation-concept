import "../../globals.css";
import { en } from "@/content/en";
import { RootShell, buildMetadata } from "@/lib/layout";

export { viewport } from "@/lib/layout";
export const metadata = buildMetadata(en, "/en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}

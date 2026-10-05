import type { Dict } from "@/content/types";
import { Nav } from "./Nav";
import { ScrollSilkHero } from "./ScrollSilkHero";
import { About } from "./About";
import { Works } from "./Works";
import { Services } from "./Services";
import { Process } from "./Process";
import { BriefBuilder } from "./BriefBuilder";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

export function Landing({ dict }: { dict: Dict }) {
  return (
    <>
      <Nav nav={dict.nav} />
      <main>
        <ScrollSilkHero hero={dict.hero} />
        <div className="relative">
          <About about={dict.about} />
          <Works works={dict.works} />
          <Services services={dict.services} />
          <Process process={dict.process} />
          <BriefBuilder brief={dict.brief} />
          <Faq faq={dict.faq} />
        </div>
        <FinalCta cta={dict.cta} />
      </main>
      <Footer footer={dict.footer} />
    </>
  );
}

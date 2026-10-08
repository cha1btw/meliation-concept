import type { Dict } from "@/content/types";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { FounderLetter } from "./FounderLetter";
import { Challenges } from "./Challenges";
import { Istanbul } from "./Istanbul";
import { Services } from "./Services";
import { Process } from "./Process";
import { Journal } from "./Journal";
import { BriefBuilder } from "./BriefBuilder";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";

export function Landing({ dict }: { dict: Dict }) {
  return (
    <>
      <Nav nav={dict.nav} />
      <main>
        <Hero hero={dict.hero} tagline={dict.nav.tagline} />
        <FounderLetter founder={dict.founder} />
        <Challenges challenges={dict.challenges} />
        <Istanbul istanbul={dict.istanbul} />
        <Services services={dict.services} />
        <Process process={dict.process} />
        <Journal journal={dict.journal} />
        <BriefBuilder brief={dict.brief} />
        <Faq faq={dict.faq} />
        <FinalCta cta={dict.cta} tagline={dict.nav.tagline} />
      </main>
      <Footer footer={dict.footer} nav={dict.nav} />
    </>
  );
}

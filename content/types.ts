export type PhotoKey =
  | "goldSequin1"
  | "goldSequin2"
  | "showroomChair"
  | "showroomLaugh"
  | "tulleLeaves1"
  | "tulleLeaves2"
  | "portraitLace"
  | "laceBundle";

export type Option = { value: string; label: string };

export type Dict = {
  lang: "uk" | "en";
  meta: { title: string; description: string };
  nav: {
    about: string;
    services: string;
    process: string;
    faq: string;
    cta: string;
    langLabel: string;
    langHref: string;
    langAria: string;
    home: string;
    skip: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: { title: string; sub: string; cta: string };
  about: {
    title: string;
    paragraphs: string[];
    facts: { title: string; text: string }[];
    photoAlt: string;
    photo2Alt: string;
  };
  works: {
    title: string;
    intro: string;
    flipHint: string;
    items: {
      photo: PhotoKey;
      alt: string;
      caption: string;
      backTitle: string;
      backLines: string[];
    }[];
  };
  services: {
    title: string;
    intro: string;
    more: string;
    items: { title: string; short: string; details: string[] }[];
  };
  process: {
    title: string;
    steps: { verb: string; text: string }[];
  };
  brief: {
    title: string;
    intro: string;
    groups: { id: "product" | "need" | "volume" | "timing"; legend: string; options: Option[] }[];
    commentLabel: string;
    commentHelp: string;
    previewLabel: string;
    submit: string;
    note: string;
    greeting: string;
    lineLabels: { product: string; need: string; volume: string; timing: string; comment: string };
    notChosen: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; text: string; button: string };
  footer: {
    cities: { city: string; role: string; tz: string }[];
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
    credit: string;
  };
};

export type PhotoKey =
  | "melissaPortrait"
  | "fabricHands"
  | "draping"
  | "machineFoot"
  | "needle"
  | "patternWall"
  | "measuring"
  | "threadCones"
  | "silkHands"
  | "jacquardRolls"
  | "labDips"
  | "rollsLight";

export type VideoKey = "melissaShowroom" | "tulleHands";

export type Media = { kind: "photo"; photo: PhotoKey; alt: string } | { kind: "video"; video: VideoKey; alt: string };

export type Option = { value: string; label: string };

export type Dict = {
  lang: "uk" | "en";
  meta: { title: string; description: string };
  nav: {
    links: { href: string; label: string }[];
    tagline: string;
    cta: string;
    langLabel: string;
    langHref: string;
    langAria: string;
    home: string;
    skip: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: { kicker: string; title: string; text: string; cta: string; videoAlt: string };
  founder: {
    kicker: string;
    title: string;
    quote: string;
    signature: string;
    paragraphs: string[];
    photoAlt: string;
    caption: string;
  };
  challenges: {
    kicker: string;
    title: string;
    items: { label: string; text: string }[];
    link: string;
  };
  istanbul: {
    kicker: string;
    title: string;
    items: { label: string; title: string; text: string; media: Media }[];
  };
  services: {
    kicker: string;
    title: string;
    intro: string;
    more: string;
    photoAlt: string;
    items: { title: string; short: string; details: string[] }[];
  };
  process: {
    kicker: string;
    title: string;
    steps: { verb: string; text: string }[];
    strip: { photo: PhotoKey; alt: string }[];
  };
  journal: {
    kicker: string;
    title: string;
    /* Monochrome wordmarks of partner brands. The row stays hidden while the list is empty. */
    brands: string[];
    subtitle: string;
    prev: string;
    next: string;
    reviews: { focus: string; quote: string; name: string; role: string; photo: PhotoKey; alt: string }[];
  };
  brief: {
    kicker: string;
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
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; text: string; button: string; photoAlt: string };
  footer: {
    about: string;
    labTitle: string;
    contactTitle: string;
    cities: { city: string; role: string; tz: string }[];
    phoneLabel: string;
    emailLabel: string;
    instagramLabel: string;
    credit: string;
  };
};

import type { Dict } from "./types";

export const en: Dict = {
  lang: "en",
  meta: {
    title: "Meliation Fashion Production Lab | Fabric sourcing and apparel production in Istanbul",
    description:
      "A concierge service for textile sourcing and turnkey apparel production in Istanbul. Premium fabrics, flexible MOQ and on-site quality control.",
  },
  nav: {
    links: [
      { href: "#editorial", label: "Editorial" },
      { href: "#istanbul", label: "Why Istanbul" },
      { href: "#services", label: "Our Lab Services" },
      { href: "#journal", label: "The B2B Journal" },
      { href: "#faq", label: "FAQ" },
    ],
    tagline: "Fashion Production Lab",
    cta: "Discuss a project",
    langLabel: "UA",
    langHref: "/",
    langAria: "Українська версія",
    home: "Meliation, back to top",
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  hero: {
    kicker: "The new era of supply chain",
    title: "Scale your fashion creativity into a high-level commercial product.",
    text: "A concierge service for textile sourcing and turnkey apparel production in Istanbul. Professional supply chain, precise sourcing of premium fabrics and full collection management, without production mishaps or burnt budgets.",
    cta: "Discover the lab services",
    videoAlt: "Melissa looking through embellished fabrics in an Istanbul showroom",
  },
  founder: {
    kicker: "The founder’s letter",
    title: "An insider who knows the industry from within",
    quote: "“Your design deserves flawless execution. No compromises.”",
    signature: "Melissa",
    paragraphs: [
      "Hi! My name is Melissa, and I am the founder of Meliation Fashion Production Lab.",
      "For more than 10 years my professional life belonged to fashion retail in Kyiv. I went from working in top retail chains to coordinating processes for local commercial brands. I know how fashion is made: from the first passionate moodboard of a collection to the final sold-out on the rails.",
      "Moving to Istanbul opened a new level for me: the epicentre of global textile development. Today I offer brands a concierge service for textile sourcing and turnkey apparel production in Istanbul. I speak fluent Turkish with factory owners and act as your trusted person on the ground.",
    ],
    photoAlt: "Melissa laughing in an armchair among rolls of embellished fabric",
    caption: "Melissa, founder of Meliation. Istanbul",
  },
  challenges: {
    kicker: "The industry challenges",
    title: "For founders only: the technical challenges of the backstage",
    items: [
      {
        label: "Communication",
        text: "It is hard to explain the fit of a jacket or the architecture of a seam to a factory from far away.",
      },
      {
        label: "Volumes",
        text: "Large factories turn down limited capsule collections because of their MOQ.",
      },
      {
        label: "Risks",
        text: "Unexpected defects in a batch, pattern layout mistakes and burnt budgets.",
      },
      {
        label: "Sourcing",
        text: "Buying fabric blind from photos, without feeling the hand or seeing the real shade.",
      },
    ],
    link: "How the lab solves each of them",
  },
  istanbul: {
    kicker: "The Istanbul advantage",
    title: "A strategic choice: why Istanbul, right now?",
    items: [
      {
        label: "Fast fashion logistics",
        title: "Speed and flexibility",
        text: "Unlike Asia, the production cycle in Istanbul lets you react to trends instantly. Cargo to Ukraine takes a matter of days, which is ideal for quick capsule releases and fast restocks of your sold-out pieces.",
        media: { kind: "video", video: "tulleHands", alt: "Hands sorting embellished tulle on a showroom rail" },
      },
      {
        label: "High-end production",
        title: "Premium quality, honest price",
        text: "Turkish factories lead in textiles on the level of European luxury houses. You get world-class quality with an optimised cost for every unit.",
        media: { kind: "photo", photo: "labDips", alt: "Lab dip cards with fabric swatches in different shades" },
      },
      {
        label: "Flexible MOQ",
        title: "Small runs within reach",
        text: "Through the lab you get access to factories with a flexible MOQ (minimum order quantity), so you can launch drops without freezing a lot of working capital.",
        media: { kind: "photo", photo: "patternWall", alt: "Paper patterns hanging on a studio wall above industrial sewing machines" },
      },
    ],
  },
  services: {
    kicker: "Our lab services",
    title: "From fabric to finished batch",
    intro: "Come with a precise request. Or just with an idea.",
    more: "What’s included",
    photoAlt: "Hands feeling a beige cloth next to a roll of fabric",
    items: [
      {
        title: "Fabric sourcing",
        short: "I find the cloth you need or offer alternatives.",
        details: [
          "Sourcing and buying fabric across Türkiye",
          "Matched to your collection and technical needs",
          "Alternatives at different price points",
          "Swatches and colour cards",
          "Stock, lead time and MOQ checks",
          "Trims, thread, lining, interfacing",
        ],
      },
      {
        title: "Print development",
        short: "From an idea to a print on the chosen fabric.",
        details: [
          "Finding and selecting prints for your idea",
          "Adapting the artwork to the fabric and technique",
          "Digital, screen and sublimation printing",
          "Colour and strike-off control",
        ],
      },
      {
        title: "Factory search",
        short: "The right factory for your product and volume.",
        details: [
          "A factory that fits your product",
          "Compared on price, quality and capacity",
          "Negotiating terms and minimum runs",
          "Visits to showrooms and factories with you",
        ],
      },
      {
        title: "Collection development and production",
        short: "From the first sample to the finished batch.",
        details: [
          "Sample from a reference or a sketch",
          "Pattern making and the first sample",
          "Fitting rounds up to the PPS sample",
          "Small and large runs",
          "Cutting, sewing, pressing, packing",
          "Print, embroidery, special finishes",
        ],
      },
      {
        title: "Branding and packaging",
        short: "Labels, tags and packaging with your logo.",
        details: [
          "Woven and care labels",
          "Branded hang tags",
          "Branded bags and boxes",
          "Trims with your logo",
        ],
      },
      {
        title: "Production follow-up and QC",
        short: "Communication, control and decisions on site.",
        details: [
          "Deadlines and day-to-day factory questions",
          "Inspection before shipping",
          "Regular production reports",
          "Logistics and cargo shipping",
          "Translation and support in negotiations",
        ],
      },
    ],
  },
  process: {
    kicker: "The method",
    title: "How we work",
    steps: [
      { verb: "Request", text: "We go through your idea, product, budget and timing." },
      { verb: "Sourcing", text: "I select materials, suppliers and the factory." },
      { verb: "Sample", text: "We make and refine the sample until you say yes." },
      { verb: "Production", text: "I launch the batch and oversee it on site." },
      { verb: "Shipping", text: "I check the result and arrange delivery." },
    ],
    strip: [
      { photo: "threadCones", alt: "Close-up of beige thread cones" },
      { photo: "measuring", alt: "Taking measurements on a dress form with a tape" },
      { photo: "needle", alt: "Needle of an industrial sewing machine with copper thread" },
      { photo: "jacquardRolls", alt: "Rolls of jacquard fabric" },
    ],
  },
  journal: {
    kicker: "The B2B journal",
    title: "Our clients & partners",
    brands: [],
    subtitle: "Insider feedback: what founders say",
    prev: "Previous review",
    next: "Next review",
    reviews: [
      {
        focus: "Sourcing",
        quote:
          "Finding the right shade and texture of silk was always a challenge for our brand. Melissa found the cloth we needed in a closed stock in Istanbul in just two days! Now we only work through Meliation Fashion Production Lab: it means European-quality fabrics without spending weeks searching on our own.",
        name: "Anna",
        role: "brand founder",
        photo: "silkHands",
        alt: "Hands unfolding peach-coloured silk",
      },
      {
        focus: "Quality control",
        quote:
          "The biggest fear when working with Türkiye is getting a defective batch and finding out only in Ukraine. Thanks to Melissa that fear is gone. She personally oversaw every stage of our first capsule drop in Istanbul, from the first PPS sample to packing. The seams are truly high-level. Meliation really is a concierge service for our backstage.",
        name: "Maria",
        role: "brand creative director",
        photo: "draping",
        alt: "Draping a jacket toile on a dress form",
      },
      {
        focus: "Logistics",
        quote:
          "Melissa is our superpower in Istanbul. Her Turkish and knowledge of the local market let us solve a factory issue in real time while our campaign deadline was burning. The batch reached Kyiv in 5 days, perfectly packed and ready to sell. I sincerely recommend her to anyone who values their time and peace of mind.",
        name: "Daria",
        role: "brand CEO",
        photo: "machineFoot",
        alt: "Sewing machine foot stitching beige fabric",
      },
    ],
  },
  brief: {
    kicker: "Start a brief",
    title: "Tell me about your project",
    intro: "Four clicks and a ready message opens in WhatsApp. I come back with specifics: factory, fabric, timing, price.",
    groups: [
      {
        id: "product",
        legend: "What are we making?",
        options: [
          { value: "dresses", label: "Dresses and eveningwear" },
          { value: "outerwear", label: "Outerwear" },
          { value: "basics", label: "Basics and knitwear" },
          { value: "home", label: "Home textiles" },
          { value: "accessories", label: "Accessories" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "need",
        legend: "What do you need?",
        options: [
          { value: "fabric", label: "Fabrics only" },
          { value: "factory", label: "A factory for my product" },
          { value: "full", label: "Full cycle" },
          { value: "branding", label: "Branding and packaging" },
        ],
      },
      {
        id: "volume",
        legend: "Approximate volume",
        options: [
          { value: "small", label: "Under 100 units" },
          { value: "mid", label: "100-500" },
          { value: "large", label: "Over 500" },
          { value: "unknown", label: "Not sure yet" },
        ],
      },
      {
        id: "timing",
        legend: "When do you need it?",
        options: [
          { value: "soon", label: "In 1-2 months" },
          { value: "season", label: "In 3-4 months" },
          { value: "later", label: "Later" },
          { value: "flex", label: "Flexible" },
        ],
      },
    ],
    commentLabel: "A few words about the idea",
    commentHelp: "Optional. You can paste a link to a reference.",
    previewLabel: "Your message",
    submit: "Open WhatsApp",
    note: "The message opens in WhatsApp. You can edit it before sending.",
    greeting: "Hello Melissa! Writing from the Meliation website.",
    lineLabels: {
      product: "Product",
      need: "Need",
      volume: "Volume",
      timing: "Timing",
      comment: "Idea",
    },
    notChosen: "not chosen yet",
  },
  faq: {
    kicker: "FAQ",
    title: "Questions and answers",
    items: [
      {
        q: "How much does production cost?",
        a: "It depends on the product, fabric, volume and complexity. I give an exact price after costing it at a specific factory with a specific fabric. Product development and launch preparation are a separate service with a fixed fee.",
      },
      {
        q: "What is the minimum order?",
        a: "It depends on the product and the factory. The lab works with factories that have a flexible MOQ, so you can launch small capsules as well as large runs. I name an exact number once I understand your product.",
      },
      {
        q: "How does sampling work?",
        a: "From your sketch or reference the factory makes a pattern and sews the first sample. You get photos and, if needed, the sample itself by post. We agree on changes, and the run starts only after your yes.",
      },
      {
        q: "How does payment work?",
        a: "The development and launch service is paid before work starts. Fabrics, trims and sewing are paid separately: 50% before production starts and 50% before the finished goods ship.",
      },
      {
        q: "What if there are defects?",
        a: "Production starts only after the sample is approved, so the batch matches what we agreed. The accepted defect rate in mass production is up to 3%. If it is higher, we agree on compensation or rework.",
      },
      {
        q: "How long does delivery to Ukraine take?",
        a: "Cargo from Istanbul to Ukraine usually takes a matter of days. The exact time depends on the batch size and shipping method, and we fix it before launch.",
      },
      {
        q: "Where do I start?",
        a: "Fill in the brief above or just write on WhatsApp: what you plan to make, a rough volume, a fabric direction or a reference.",
      },
    ],
  },
  cta: {
    title: "You have the idea. I have Istanbul.",
    text: "Tell me about your product and I will show you where to start.",
    button: "Discuss a project",
    photoAlt: "Rolls of printed fabric by a window in a sunlit studio",
  },
  footer: {
    about: "A concierge service for textile sourcing and turnkey apparel production in Istanbul.",
    labTitle: "The lab",
    contactTitle: "Contact",
    cities: [
      { city: "Istanbul", role: "Production and market", tz: "GMT+3" },
      { city: "Kyiv", role: "Communication and payments", tz: "GMT+2" },
    ],
    phoneLabel: "Phone and WhatsApp",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    credit: "Website concept",
  },
};

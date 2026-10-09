import type { StaticImageData } from "next/image";
import type { PhotoKey, VideoKey } from "@/content/types";

import melissaPortrait from "@/public/assets/editorial/melissa-portrait.webp";
import silkHands from "@/public/assets/editorial/silk-hands.webp";
import fabricHands from "@/public/assets/editorial/fabric-hands.webp";
import trims from "@/public/assets/editorial/trims.webp";
import patternWall from "@/public/assets/editorial/pattern-wall.webp";
import measuring from "@/public/assets/editorial/measuring.webp";
import threadCones from "@/public/assets/editorial/thread-cones.webp";
import jacquardRolls from "@/public/assets/editorial/jacquard-rolls.webp";
import labDips from "@/public/assets/editorial/lab-dips.webp";
import reviewAnna from "@/public/assets/editorial/review-anna.webp";
import reviewMaria from "@/public/assets/editorial/review-maria.webp";
import reviewDaria from "@/public/assets/editorial/review-daria.webp";
import reviewValeria from "@/public/assets/editorial/review-valeria.webp";
import reviewKristina from "@/public/assets/editorial/review-kristina.webp";
import reviewOlena from "@/public/assets/editorial/review-olena.webp";
import rollsLight from "@/public/assets/editorial/rolls-light.webp";

export const contacts = {
  phone: "+380639597795",
  phoneDisplay: "+380 63 959 77 95",
  whatsapp: "380639597795",
  email: "hello@meliation.com.ua",
  instagram: [
    { handle: "@meliation", href: "https://instagram.com/meliation" },
    { handle: "@y.melissa", href: "https://instagram.com/y.melissa" },
  ],
};

export const photos: Record<PhotoKey, StaticImageData> = {
  melissaPortrait,
  silkHands,
  fabricHands,
  trims,
  patternWall,
  measuring,
  threadCones,
  jacquardRolls,
  labDips,
  rollsLight,
  reviewAnna,
  reviewMaria,
  reviewDaria,
  reviewValeria,
  reviewKristina,
  reviewOlena,
};

// Vertical 720x1280 H.264 clips without audio; the poster is the first frame.
export const videos: Record<VideoKey, { src: string; poster: string }> = {
  melissaShowroom: { src: "/assets/video/melissa-showroom.mp4", poster: "/assets/video/melissa-showroom.jpg" },
  tulleHands: { src: "/assets/video/tulle-hands.mp4", poster: "/assets/video/tulle-hands.jpg" },
};

export function whatsappLink(text: string) {
  return `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(text)}`;
}

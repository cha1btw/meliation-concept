import type { StaticImageData } from "next/image";
import type { PhotoKey, VideoKey } from "@/content/types";

import melissaPortrait from "@/public/assets/editorial/melissa-portrait.webp";
import fabricHands from "@/public/assets/editorial/fabric-hands.webp";
import draping from "@/public/assets/editorial/draping.webp";
import machineFoot from "@/public/assets/editorial/machine-foot.webp";
import needle from "@/public/assets/editorial/needle.webp";
import patternWall from "@/public/assets/editorial/pattern-wall.webp";
import measuring from "@/public/assets/editorial/measuring.webp";
import threadCones from "@/public/assets/editorial/thread-cones.webp";
import silkHands from "@/public/assets/editorial/silk-hands.webp";
import jacquardRolls from "@/public/assets/editorial/jacquard-rolls.webp";
import labDips from "@/public/assets/editorial/lab-dips.webp";
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
  fabricHands,
  draping,
  machineFoot,
  needle,
  patternWall,
  measuring,
  threadCones,
  silkHands,
  jacquardRolls,
  labDips,
  rollsLight,
};

// Vertical 720x1280 H.264 clips without audio; the poster is the first frame.
export const videos: Record<VideoKey, { src: string; poster: string }> = {
  melissaShowroom: { src: "/assets/video/melissa-showroom.mp4", poster: "/assets/video/melissa-showroom.jpg" },
  tulleHands: { src: "/assets/video/tulle-hands.mp4", poster: "/assets/video/tulle-hands.jpg" },
};

export function whatsappLink(text: string) {
  return `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(text)}`;
}

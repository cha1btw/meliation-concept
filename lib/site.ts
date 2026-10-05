import type { StaticImageData } from "next/image";
import type { PhotoKey } from "@/content/types";

import goldSequin1 from "@/public/assets/photos/gold-sequin-1.webp";
import goldSequin2 from "@/public/assets/photos/gold-sequin-2.webp";
import showroomChair from "@/public/assets/photos/showroom-chair.webp";
import showroomLaugh from "@/public/assets/photos/showroom-laugh.webp";
import tulleLeaves1 from "@/public/assets/photos/tulle-leaves-1.webp";
import tulleLeaves2 from "@/public/assets/photos/tulle-leaves-2.webp";
import portraitLace from "@/public/assets/photos/portrait-lace.webp";
import laceBundle from "@/public/assets/photos/lace-bundle.webp";

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
  goldSequin1,
  goldSequin2,
  showroomChair,
  showroomLaugh,
  tulleLeaves1,
  tulleLeaves2,
  portraitLace,
  laceBundle,
};

export function whatsappLink(text: string) {
  return `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(text)}`;
}

import { Dayjs } from "dayjs";
import { Metadata } from "next";

export const createMetadata = (date: Dayjs): Metadata => ({
  title: `Kalender Puasa Muslim ${date.format("MMMM YYYY")}`,
  description: `Kalender Puasa Wajib dan Sunnah untuk Muslim ${date.format("MMMM YYYY")}`,
  icons: {
    icon: "/kal.png",
  },
  openGraph: {
    title: `Kalender Puasa Muslim ${date.format("MMMM YYYY")}`,
    description: `Kalender Puasa Wajib dan Sunnah untuk Muslim ${date.format("MMMM YYYY")}`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Kalender Puasa Muslim ${date.format("MMMM YYYY")}`,
      },
    ],
  },
  twitter: {
    title: `Kalender Puasa Muslim ${date.format("MMMM YYYY")}`,
    description: `Kalender Puasa Wajib dan Sunnah untuk Muslim ${date.format("MMMM YYYY")}`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Kalender Puasa Muslim ${date.format("MMMM YYYY")}`,
      },
    ],
  },
});

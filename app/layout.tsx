import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddedToast from "@/components/AddedToast";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { SOCIAL } from "@/lib/links";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Smash Bacon — Smash Burgers at Market on 8th, National City | Order Pickup",
  description:
    "Smash burgers, buffalo chicken, shareables and hand-spun shakes inside the Market on 8th food hall in National City. Order online for pickup — no delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Smash Bacon",
    title: "Smash Bacon — Order Pickup",
    description:
      "Smash burgers, buffalo chicken & shakes inside Market on 8th, National City. Order online for pickup.",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BUSINESS.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/bacon-avocado-burger.png`,
  servesCuisine: ["Burgers", "American"],
  priceRange: "$",
  telephone: BUSINESS.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.lat,
    longitude: BUSINESS.lng,
  },
  sameAs: [SOCIAL.instagram, SOCIAL.facebook, BUSINESS.yelp],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "21:00",
    },
  ],
  hasMenu: `${SITE_URL}/menu`,
  potentialAction: {
    "@type": "OrderAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/menu`,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModePickUp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <AddedToast />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import CityCompanionPage from "@/components/CityCompanionPage";
import { getCityCompanionData } from "@/data/cityCompanionData";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { city, profile } = getCityCompanionData("ludhiana", "boyfriend");
  return {
    title: profile.title,
    description: profile.metaDescription,
    keywords: profile.keywords,
    alternates: {
      canonical: `/${city.cityKey}/rent-a-boyfriend-in-${city.cityKey}`,
    },
    openGraph: {
      title: profile.title,
      description: profile.metaDescription,
      url: `/${city.cityKey}/rent-a-boyfriend-in-${city.cityKey}`,
      siteName: "Stranger Mingle",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function Page() {
  return <CityCompanionPage cityKey="ludhiana" companionType="boyfriend" />;
}

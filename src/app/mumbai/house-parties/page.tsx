import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Mumbai | Local Social Mixers & Meetups",
    description: "Looking for house parties in Mumbai? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Bandra, Andheri & Powai.",
    keywords: ["house parties in Mumbai", "social mixers Mumbai", "Mumbai weekend parties", "platonic house party Mumbai", "board game night Mumbai"],
    alternates: {
        canonical: '/mumbai/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="mumbai" cityName="Mumbai" dbCityName="mumbai" />;
}

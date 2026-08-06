import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Ludhiana | Local Social Mixers & Meetups",
    description: "Looking for house parties in Ludhiana? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Sarabha Nagar, Model Town & BRS Nagar.",
    keywords: ["house parties in Ludhiana", "social mixers Ludhiana", "Ludhiana weekend parties", "platonic house party Ludhiana", "board game night Ludhiana"],
    alternates: {
        canonical: '/ludhiana/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="ludhiana" cityName="Ludhiana" dbCityName="Ludhiana" />;
}

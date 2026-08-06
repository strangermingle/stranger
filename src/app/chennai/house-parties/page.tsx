import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Chennai | Local Social Mixers & Meetups",
    description: "Looking for house parties in Chennai? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Anna Nagar, Adyar & T. Nagar.",
    keywords: ["house parties in Chennai", "social mixers Chennai", "Chennai weekend parties", "platonic house party Chennai", "board game night Chennai"],
    alternates: {
        canonical: '/chennai/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="chennai" cityName="Chennai" dbCityName="Chennai" />;
}

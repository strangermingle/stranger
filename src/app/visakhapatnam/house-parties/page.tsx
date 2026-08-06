import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Visakhapatnam | Local Social Mixers & Meetups",
    description: "Looking for house parties in Visakhapatnam? Join safe, curated platonic house parties, rooftop mixers, and board game nights in MVP Colony, Rushikonda & Beach Road.",
    keywords: ["house parties in Visakhapatnam", "social mixers Visakhapatnam", "Visakhapatnam weekend parties", "platonic house party Visakhapatnam", "board game night Visakhapatnam"],
    alternates: {
        canonical: '/visakhapatnam/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="visakhapatnam" cityName="Visakhapatnam" dbCityName="Visakhapatnam" />;
}

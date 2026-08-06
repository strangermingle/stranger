import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Nagpur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Nagpur? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Dharampeth, Ramdaspeth & Sitabuldi.",
    keywords: ["house parties in Nagpur", "social mixers Nagpur", "Nagpur weekend parties", "platonic house party Nagpur", "board game night Nagpur"],
    alternates: {
        canonical: '/nagpur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="nagpur" cityName="Nagpur" dbCityName="Nagpur" />;
}

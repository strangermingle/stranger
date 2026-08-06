import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Kolkata | Local Social Mixers & Meetups",
    description: "Looking for house parties in Kolkata? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Park Street, Salt Lake & Ballygunge.",
    keywords: ["house parties in Kolkata", "social mixers Kolkata", "Kolkata weekend parties", "platonic house party Kolkata", "board game night Kolkata"],
    alternates: {
        canonical: '/kolkata/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="kolkata" cityName="Kolkata" dbCityName="Kolkata" />;
}

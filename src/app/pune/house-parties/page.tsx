import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Pune | Local Social Mixers & Meetups",
    description: "Looking for house parties in Pune? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Viman Nagar, Baner & Hinjewadi.",
    keywords: ["house parties in Pune", "social mixers Pune", "Pune weekend parties", "platonic house party Pune", "board game night Pune"],
    alternates: {
        canonical: '/pune/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="pune" cityName="Pune" dbCityName="Pune" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Bengaluru | Local Social Mixers & Meetups",
    description: "Looking for house parties in Bengaluru? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Koramangala, Indiranagar & HSR Layout.",
    keywords: ["house parties in Bengaluru", "social mixers Bengaluru", "Bengaluru weekend parties", "platonic house party Bengaluru", "board game night Bengaluru"],
    alternates: {
        canonical: '/bangalore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="bangalore" cityName="Bangalore" dbCityName="bangalore" />;
}

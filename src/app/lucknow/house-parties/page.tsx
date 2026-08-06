import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Lucknow | Local Social Mixers & Meetups",
    description: "Looking for house parties in Lucknow? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Gomti Nagar, Hazratganj & Aliganj.",
    keywords: ["house parties in Lucknow", "social mixers Lucknow", "Lucknow weekend parties", "platonic house party Lucknow", "board game night Lucknow"],
    alternates: {
        canonical: '/lucknow/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="lucknow" cityName="Lucknow" dbCityName="Lucknow" />;
}

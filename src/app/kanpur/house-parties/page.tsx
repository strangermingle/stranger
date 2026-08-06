import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Kanpur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Kanpur? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Civil Lines, Swaroop Nagar & Kidwai Nagar.",
    keywords: ["house parties in Kanpur", "social mixers Kanpur", "Kanpur weekend parties", "platonic house party Kanpur", "board game night Kanpur"],
    alternates: {
        canonical: '/kanpur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="kanpur" cityName="Kanpur" dbCityName="Kanpur" />;
}

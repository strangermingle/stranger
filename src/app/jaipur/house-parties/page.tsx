import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Jaipur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Jaipur? Join safe, curated platonic house parties, rooftop mixers, and board game nights in C-Scheme, Malviya Nagar & Vaishali Nagar.",
    keywords: ["house parties in Jaipur", "social mixers Jaipur", "Jaipur weekend parties", "platonic house party Jaipur", "board game night Jaipur"],
    alternates: {
        canonical: '/jaipur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="jaipur" cityName="Jaipur" dbCityName="Jaipur" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Indore | Local Social Mixers & Meetups",
    description: "Looking for house parties in Indore? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Vijay Nagar, Palasia & Scheme 54.",
    keywords: ["house parties in Indore", "social mixers Indore", "Indore weekend parties", "platonic house party Indore", "board game night Indore"],
    alternates: {
        canonical: '/indore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="indore" cityName="Indore" dbCityName="Indore" />;
}

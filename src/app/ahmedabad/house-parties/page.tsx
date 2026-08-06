import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Ahmedabad | Local Social Mixers & Meetups",
    description: "Looking for house parties in Ahmedabad? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Satellite, Navrangpura & Bopal.",
    keywords: ["house parties in Ahmedabad", "social mixers Ahmedabad", "Ahmedabad weekend parties", "platonic house party Ahmedabad", "board game night Ahmedabad"],
    alternates: {
        canonical: '/ahmedabad/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="ahmedabad" cityName="Ahmedabad" dbCityName="Ahmedabad" />;
}

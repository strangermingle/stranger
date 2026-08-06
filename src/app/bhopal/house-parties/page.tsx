import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Bhopal | Local Social Mixers & Meetups",
    description: "Looking for house parties in Bhopal? Join safe, curated platonic house parties, rooftop mixers, and board game nights in MP Nagar, Arera Colony & Shahpura.",
    keywords: ["house parties in Bhopal", "social mixers Bhopal", "Bhopal weekend parties", "platonic house party Bhopal", "board game night Bhopal"],
    alternates: {
        canonical: '/bhopal/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="bhopal" cityName="Bhopal" dbCityName="Bhopal" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Coimbatore | Local Social Mixers & Meetups",
    description: "Looking for house parties in Coimbatore? Join safe, curated platonic house parties, rooftop mixers, and board game nights in RS Puram, Peelamedu & Saibaba Colony.",
    keywords: ["house parties in Coimbatore", "social mixers Coimbatore", "Coimbatore weekend parties", "platonic house party Coimbatore", "board game night Coimbatore"],
    alternates: {
        canonical: '/coimbatore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="coimbatore" cityName="Coimbatore" dbCityName="Coimbatore" />;
}

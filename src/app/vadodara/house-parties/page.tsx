import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Vadodara | Local Social Mixers & Meetups",
    description: "Looking for house parties in Vadodara? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Alkapuri, Sayajigunj & Fatehgunj.",
    keywords: ["house parties in Vadodara", "social mixers Vadodara", "Vadodara weekend parties", "platonic house party Vadodara", "board game night Vadodara"],
    alternates: {
        canonical: '/vadodara/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="vadodara" cityName="Vadodara" dbCityName="Vadodara" />;
}

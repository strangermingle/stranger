import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Patna | Local Social Mixers & Meetups",
    description: "Looking for house parties in Patna? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Boring Road, Kankarbagh & Rajendra Nagar.",
    keywords: ["house parties in Patna", "social mixers Patna", "Patna weekend parties", "platonic house party Patna", "board game night Patna"],
    alternates: {
        canonical: '/patna/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="patna" cityName="Patna" dbCityName="Patna" />;
}

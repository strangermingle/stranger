import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Patna | Local Social Mixers & Meetups",
    description: "Looking for house parties in Patna? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Patna.",
    alternates: {
        canonical: '/patna/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="patna" cityName="Patna" dbCityName="Patna" />;
}

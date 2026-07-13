import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Chennai | Local Social Mixers & Meetups",
    description: "Looking for house parties in Chennai? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Chennai.",
    alternates: {
        canonical: '/chennai/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="chennai" cityName="Chennai" dbCityName="Chennai" />;
}

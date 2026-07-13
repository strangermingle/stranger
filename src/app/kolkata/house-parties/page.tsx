import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Kolkata | Local Social Mixers & Meetups",
    description: "Looking for house parties in Kolkata? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Kolkata.",
    alternates: {
        canonical: '/kolkata/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="kolkata" cityName="Kolkata" dbCityName="Kolkata" />;
}

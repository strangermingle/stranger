import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Bangalore | Local Social Mixers & Meetups",
    description: "Looking for house parties in Bangalore? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Bangalore.",
    alternates: {
        canonical: '/bangalore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="bangalore" cityName="Bangalore" dbCityName="bangalore" />;
}

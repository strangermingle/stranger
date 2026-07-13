import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Lucknow | Local Social Mixers & Meetups",
    description: "Looking for house parties in Lucknow? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Lucknow.",
    alternates: {
        canonical: '/lucknow/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="lucknow" cityName="Lucknow" dbCityName="Lucknow" />;
}

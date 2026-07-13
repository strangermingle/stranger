import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Mumbai | Local Social Mixers & Meetups",
    description: "Looking for house parties in Mumbai? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Mumbai.",
    alternates: {
        canonical: '/mumbai/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="mumbai" cityName="Mumbai" dbCityName="mumbai" />;
}

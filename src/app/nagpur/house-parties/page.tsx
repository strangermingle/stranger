import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Nagpur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Nagpur? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Nagpur.",
    alternates: {
        canonical: '/nagpur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="nagpur" cityName="Nagpur" dbCityName="Nagpur" />;
}

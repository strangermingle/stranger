import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Jaipur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Jaipur? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Jaipur.",
    alternates: {
        canonical: '/jaipur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="jaipur" cityName="Jaipur" dbCityName="Jaipur" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Delhi | Local Social Mixers & Meetups",
    description: "Looking for house parties in Delhi? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Delhi.",
    alternates: {
        canonical: '/delhi/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="delhi" cityName="Delhi" dbCityName="Delhi" />;
}

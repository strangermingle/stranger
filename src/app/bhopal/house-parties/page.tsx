import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Bhopal | Local Social Mixers & Meetups",
    description: "Looking for house parties in Bhopal? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Bhopal.",
    alternates: {
        canonical: '/bhopal/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="bhopal" cityName="Bhopal" dbCityName="Bhopal" />;
}

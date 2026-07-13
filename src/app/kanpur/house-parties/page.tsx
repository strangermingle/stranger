import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Kanpur | Local Social Mixers & Meetups",
    description: "Looking for house parties in Kanpur? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Kanpur.",
    alternates: {
        canonical: '/kanpur/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="kanpur" cityName="Kanpur" dbCityName="Kanpur" />;
}

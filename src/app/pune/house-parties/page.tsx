import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Pune | Local Social Mixers & Meetups",
    description: "Looking for house parties in Pune? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Pune.",
    alternates: {
        canonical: '/pune/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="pune" cityName="Pune" dbCityName="Pune" />;
}

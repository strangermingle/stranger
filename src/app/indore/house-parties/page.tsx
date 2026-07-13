import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Indore | Local Social Mixers & Meetups",
    description: "Looking for house parties in Indore? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Indore.",
    alternates: {
        canonical: '/indore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="indore" cityName="Indore" dbCityName="Indore" />;
}

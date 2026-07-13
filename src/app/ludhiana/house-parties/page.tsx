import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Ludhiana | Local Social Mixers & Meetups",
    description: "Looking for house parties in Ludhiana? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Ludhiana.",
    alternates: {
        canonical: '/ludhiana/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="ludhiana" cityName="Ludhiana" dbCityName="Ludhiana" />;
}

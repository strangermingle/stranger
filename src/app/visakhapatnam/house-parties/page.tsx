import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Visakhapatnam | Local Social Mixers & Meetups",
    description: "Looking for house parties in Visakhapatnam? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Visakhapatnam.",
    alternates: {
        canonical: '/visakhapatnam/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="visakhapatnam" cityName="Visakhapatnam" dbCityName="Visakhapatnam" />;
}

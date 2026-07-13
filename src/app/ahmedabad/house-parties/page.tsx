import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Ahmedabad | Local Social Mixers & Meetups",
    description: "Looking for house parties in Ahmedabad? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Ahmedabad.",
    alternates: {
        canonical: '/ahmedabad/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="ahmedabad" cityName="Ahmedabad" dbCityName="Ahmedabad" />;
}

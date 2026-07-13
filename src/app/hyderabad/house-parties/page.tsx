import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Hyderabad | Local Social Mixers & Meetups",
    description: "Looking for house parties in Hyderabad? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Hyderabad.",
    alternates: {
        canonical: '/hyderabad/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="hyderabad" cityName="Hyderabad" dbCityName="Hyderabad" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Coimbatore | Local Social Mixers & Meetups",
    description: "Looking for house parties in Coimbatore? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Coimbatore.",
    alternates: {
        canonical: '/coimbatore/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="coimbatore" cityName="Coimbatore" dbCityName="Coimbatore" />;
}

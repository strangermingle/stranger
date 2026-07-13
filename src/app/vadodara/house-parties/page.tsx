import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Vadodara | Local Social Mixers & Meetups",
    description: "Looking for house parties in Vadodara? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Vadodara.",
    alternates: {
        canonical: '/vadodara/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="vadodara" cityName="Vadodara" dbCityName="Vadodara" />;
}

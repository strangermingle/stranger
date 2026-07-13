import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Surat | Local Social Mixers & Meetups",
    description: "Looking for house parties in Surat? Join weekend stranger meetups, offline social mixers, and fun in-person house parties in Surat.",
    alternates: {
        canonical: '/surat/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="surat" cityName="Surat" dbCityName="Surat" />;
}

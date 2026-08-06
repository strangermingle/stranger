import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Delhi | Local Social Mixers & Meetups",
    description: "Looking for house parties in Delhi? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Connaught Place, Hauz Khas & Saket.",
    keywords: ["house parties in Delhi", "social mixers Delhi", "Delhi weekend parties", "platonic house party Delhi", "board game night Delhi"],
    alternates: {
        canonical: '/delhi/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="delhi" cityName="Delhi" dbCityName="Delhi" />;
}

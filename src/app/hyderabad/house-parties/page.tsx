import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Hyderabad | Local Social Mixers & Meetups",
    description: "Looking for house parties in Hyderabad? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Jubilee Hills, Hitech City & Gachibowli.",
    keywords: ["house parties in Hyderabad", "social mixers Hyderabad", "Hyderabad weekend parties", "platonic house party Hyderabad", "board game night Hyderabad"],
    alternates: {
        canonical: '/hyderabad/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="hyderabad" cityName="Hyderabad" dbCityName="Hyderabad" />;
}

import type { Metadata } from "next";
import HousePartiesCityPage from "@/components/HousePartiesCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "House Parties in Surat | Local Social Mixers & Meetups",
    description: "Looking for house parties in Surat? Join safe, curated platonic house parties, rooftop mixers, and board game nights in Adajan, Vesu & Athwa.",
    keywords: ["house parties in Surat", "social mixers Surat", "Surat weekend parties", "platonic house party Surat", "board game night Surat"],
    alternates: {
        canonical: '/surat/house-parties',
    }
};

export default function Page() {
    return <HousePartiesCityPage cityKey="surat" cityName="Surat" dbCityName="Surat" />;
}

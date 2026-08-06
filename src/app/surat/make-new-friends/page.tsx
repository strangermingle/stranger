import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Surat | Local Meetups & Social Groups",
    description: "Looking to make new friends in Surat? Join weekend stranger meetups, offline networking groups, and social circles in Adajan, Vesu & Athwa.",
    keywords: ["make new friends in Surat", "how to make friends in Surat", "Surat social groups", "Surat meetups", "find friends in Surat"],
    alternates: {
        canonical: '/surat/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="surat" cityName="Surat" dbCityName="Surat" />;
}

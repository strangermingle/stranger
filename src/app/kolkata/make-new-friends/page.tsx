import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Kolkata | Local Meetups & Social Groups",
    description: "Looking to make new friends in Kolkata? Join weekend stranger meetups, offline networking groups, and social circles in Park Street, Salt Lake & Ballygunge.",
    keywords: ["make new friends in Kolkata", "how to make friends in Kolkata", "Kolkata social groups", "Kolkata meetups", "find friends in Kolkata"],
    alternates: {
        canonical: '/kolkata/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="kolkata" cityName="Kolkata" dbCityName="Kolkata" />;
}

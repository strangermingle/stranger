import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Chennai | Local Meetups & Social Groups",
    description: "Looking to make new friends in Chennai? Join weekend stranger meetups, offline networking groups, and social circles in Anna Nagar, Adyar & T. Nagar.",
    keywords: ["make new friends in Chennai", "how to make friends in Chennai", "Chennai social groups", "Chennai meetups", "find friends in Chennai"],
    alternates: {
        canonical: '/chennai/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="chennai" cityName="Chennai" dbCityName="Chennai" />;
}

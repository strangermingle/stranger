import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Visakhapatnam | Local Meetups & Social Groups",
    description: "Looking to make new friends in Visakhapatnam? Join weekend stranger meetups, offline networking groups, and social circles in MVP Colony, Rushikonda & Beach Road.",
    keywords: ["make new friends in Visakhapatnam", "how to make friends in Visakhapatnam", "Visakhapatnam social groups", "Visakhapatnam meetups", "find friends in Visakhapatnam"],
    alternates: {
        canonical: '/visakhapatnam/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="visakhapatnam" cityName="Visakhapatnam" dbCityName="Visakhapatnam" />;
}

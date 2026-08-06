import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Nagpur | Local Meetups & Social Groups",
    description: "Looking to make new friends in Nagpur? Join weekend stranger meetups, offline networking groups, and social circles in Dharampeth, Ramdaspeth & Sitabuldi.",
    keywords: ["make new friends in Nagpur", "how to make friends in Nagpur", "Nagpur social groups", "Nagpur meetups", "find friends in Nagpur"],
    alternates: {
        canonical: '/nagpur/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="nagpur" cityName="Nagpur" dbCityName="Nagpur" />;
}

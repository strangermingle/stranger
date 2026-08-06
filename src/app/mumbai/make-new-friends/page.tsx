import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Mumbai | Local Meetups & Social Groups",
    description: "Looking to make new friends in Mumbai? Join weekend stranger meetups, offline networking groups, and social circles in Bandra, Andheri & Powai.",
    keywords: ["make new friends in Mumbai", "how to make friends in Mumbai", "Mumbai social groups", "Mumbai meetups", "find friends in Mumbai"],
    alternates: {
        canonical: '/mumbai/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="mumbai" cityName="Mumbai" dbCityName="mumbai" />;
}

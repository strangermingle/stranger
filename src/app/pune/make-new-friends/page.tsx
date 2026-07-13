import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Pune | Local Meetups & Social Groups",
    description: "Looking to make new friends in Pune? Join weekend stranger meetups, offline networking groups, and fun social experiences in Pune.",
    alternates: {
        canonical: '/pune/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="pune" cityName="Pune" dbCityName="Pune" />;
}

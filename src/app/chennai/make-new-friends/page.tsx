import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Chennai | Local Meetups & Social Groups",
    description: "Looking to make new friends in Chennai? Join weekend stranger meetups, offline networking groups, and fun social experiences in Chennai.",
    alternates: {
        canonical: '/chennai/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="chennai" cityName="Chennai" dbCityName="Chennai" />;
}

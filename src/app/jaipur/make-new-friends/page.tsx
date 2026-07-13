import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Jaipur | Local Meetups & Social Groups",
    description: "Looking to make new friends in Jaipur? Join weekend stranger meetups, offline networking groups, and fun social experiences in Jaipur.",
    alternates: {
        canonical: '/jaipur/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="jaipur" cityName="Jaipur" dbCityName="Jaipur" />;
}

import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Bangalore | Local Meetups & Social Groups",
    description: "Looking to make new friends in Bangalore? Join weekend stranger meetups, offline networking groups, and fun social experiences in Bangalore.",
    alternates: {
        canonical: '/bangalore/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="bangalore" cityName="Bangalore" dbCityName="bangalore" />;
}

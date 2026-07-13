import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Lucknow | Local Meetups & Social Groups",
    description: "Looking to make new friends in Lucknow? Join weekend stranger meetups, offline networking groups, and fun social experiences in Lucknow.",
    alternates: {
        canonical: '/lucknow/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="lucknow" cityName="Lucknow" dbCityName="Lucknow" />;
}

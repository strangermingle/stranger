import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Ludhiana | Local Meetups & Social Groups",
    description: "Looking to make new friends in Ludhiana? Join weekend stranger meetups, offline networking groups, and fun social experiences in Ludhiana.",
    alternates: {
        canonical: '/ludhiana/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="ludhiana" cityName="Ludhiana" dbCityName="Ludhiana" />;
}

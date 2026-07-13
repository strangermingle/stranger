import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Patna | Local Meetups & Social Groups",
    description: "Looking to make new friends in Patna? Join weekend stranger meetups, offline networking groups, and fun social experiences in Patna.",
    alternates: {
        canonical: '/patna/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="patna" cityName="Patna" dbCityName="Patna" />;
}

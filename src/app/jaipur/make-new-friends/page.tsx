import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Jaipur | Local Meetups & Social Groups",
    description: "Looking to make new friends in Jaipur? Join weekend stranger meetups, offline networking groups, and social circles in C-Scheme, Malviya Nagar & Vaishali Nagar.",
    keywords: ["make new friends in Jaipur", "how to make friends in Jaipur", "Jaipur social groups", "Jaipur meetups", "find friends in Jaipur"],
    alternates: {
        canonical: '/jaipur/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="jaipur" cityName="Jaipur" dbCityName="Jaipur" />;
}

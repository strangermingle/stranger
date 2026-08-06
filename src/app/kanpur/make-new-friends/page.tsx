import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Kanpur | Local Meetups & Social Groups",
    description: "Looking to make new friends in Kanpur? Join weekend stranger meetups, offline networking groups, and social circles in Civil Lines, Swaroop Nagar & Kidwai Nagar.",
    keywords: ["make new friends in Kanpur", "how to make friends in Kanpur", "Kanpur social groups", "Kanpur meetups", "find friends in Kanpur"],
    alternates: {
        canonical: '/kanpur/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="kanpur" cityName="Kanpur" dbCityName="Kanpur" />;
}

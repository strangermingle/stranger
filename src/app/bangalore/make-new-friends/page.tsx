import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Bengaluru | Local Meetups & Social Groups",
    description: "Looking to make new friends in Bengaluru? Join weekend stranger meetups, offline networking groups, and social circles in Koramangala, Indiranagar & HSR Layout.",
    keywords: ["make new friends in Bengaluru", "how to make friends in Bengaluru", "Bengaluru social groups", "Bengaluru meetups", "find friends in Bengaluru"],
    alternates: {
        canonical: '/bangalore/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="bangalore" cityName="Bangalore" dbCityName="bangalore" />;
}

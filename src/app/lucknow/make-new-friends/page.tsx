import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Lucknow | Local Meetups & Social Groups",
    description: "Looking to make new friends in Lucknow? Join weekend stranger meetups, offline networking groups, and social circles in Gomti Nagar, Hazratganj & Aliganj.",
    keywords: ["make new friends in Lucknow", "how to make friends in Lucknow", "Lucknow social groups", "Lucknow meetups", "find friends in Lucknow"],
    alternates: {
        canonical: '/lucknow/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="lucknow" cityName="Lucknow" dbCityName="Lucknow" />;
}

import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Indore | Local Meetups & Social Groups",
    description: "Looking to make new friends in Indore? Join weekend stranger meetups, offline networking groups, and social circles in Vijay Nagar, Palasia & Scheme 54.",
    keywords: ["make new friends in Indore", "how to make friends in Indore", "Indore social groups", "Indore meetups", "find friends in Indore"],
    alternates: {
        canonical: '/indore/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="indore" cityName="Indore" dbCityName="Indore" />;
}

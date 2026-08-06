import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Patna | Local Meetups & Social Groups",
    description: "Looking to make new friends in Patna? Join weekend stranger meetups, offline networking groups, and social circles in Boring Road, Kankarbagh & Rajendra Nagar.",
    keywords: ["make new friends in Patna", "how to make friends in Patna", "Patna social groups", "Patna meetups", "find friends in Patna"],
    alternates: {
        canonical: '/patna/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="patna" cityName="Patna" dbCityName="Patna" />;
}

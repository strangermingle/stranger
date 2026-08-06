import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Bhopal | Local Meetups & Social Groups",
    description: "Looking to make new friends in Bhopal? Join weekend stranger meetups, offline networking groups, and social circles in MP Nagar, Arera Colony & Shahpura.",
    keywords: ["make new friends in Bhopal", "how to make friends in Bhopal", "Bhopal social groups", "Bhopal meetups", "find friends in Bhopal"],
    alternates: {
        canonical: '/bhopal/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="bhopal" cityName="Bhopal" dbCityName="Bhopal" />;
}

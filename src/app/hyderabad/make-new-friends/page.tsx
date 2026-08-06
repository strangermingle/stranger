import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Hyderabad | Local Meetups & Social Groups",
    description: "Looking to make new friends in Hyderabad? Join weekend stranger meetups, offline networking groups, and social circles in Jubilee Hills, Hitech City & Gachibowli.",
    keywords: ["make new friends in Hyderabad", "how to make friends in Hyderabad", "Hyderabad social groups", "Hyderabad meetups", "find friends in Hyderabad"],
    alternates: {
        canonical: '/hyderabad/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="hyderabad" cityName="Hyderabad" dbCityName="Hyderabad" />;
}

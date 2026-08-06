import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Ahmedabad | Local Meetups & Social Groups",
    description: "Looking to make new friends in Ahmedabad? Join weekend stranger meetups, offline networking groups, and social circles in Satellite, Navrangpura & Bopal.",
    keywords: ["make new friends in Ahmedabad", "how to make friends in Ahmedabad", "Ahmedabad social groups", "Ahmedabad meetups", "find friends in Ahmedabad"],
    alternates: {
        canonical: '/ahmedabad/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="ahmedabad" cityName="Ahmedabad" dbCityName="Ahmedabad" />;
}

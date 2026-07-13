import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Hyderabad | Local Meetups & Social Groups",
    description: "Looking to make new friends in Hyderabad? Join weekend stranger meetups, offline networking groups, and fun social experiences in Hyderabad.",
    alternates: {
        canonical: '/hyderabad/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="hyderabad" cityName="Hyderabad" dbCityName="Hyderabad" />;
}

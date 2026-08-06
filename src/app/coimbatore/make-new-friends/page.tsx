import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Coimbatore | Local Meetups & Social Groups",
    description: "Looking to make new friends in Coimbatore? Join weekend stranger meetups, offline networking groups, and social circles in RS Puram, Peelamedu & Saibaba Colony.",
    keywords: ["make new friends in Coimbatore", "how to make friends in Coimbatore", "Coimbatore social groups", "Coimbatore meetups", "find friends in Coimbatore"],
    alternates: {
        canonical: '/coimbatore/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="coimbatore" cityName="Coimbatore" dbCityName="Coimbatore" />;
}

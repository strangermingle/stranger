import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Vadodara | Local Meetups & Social Groups",
    description: "Looking to make new friends in Vadodara? Join weekend stranger meetups, offline networking groups, and social circles in Alkapuri, Sayajigunj & Fatehgunj.",
    keywords: ["make new friends in Vadodara", "how to make friends in Vadodara", "Vadodara social groups", "Vadodara meetups", "find friends in Vadodara"],
    alternates: {
        canonical: '/vadodara/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="vadodara" cityName="Vadodara" dbCityName="Vadodara" />;
}

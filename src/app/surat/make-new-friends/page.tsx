import type { Metadata } from "next";
import MakeNewFriendsCityPage from "@/components/MakeNewFriendsCityPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Make New Friends in Surat | Local Meetups & Social Groups",
    description: "Looking to make new friends in Surat? Join weekend stranger meetups, offline networking groups, and fun social experiences in Surat.",
    alternates: {
        canonical: '/surat/make-new-friends',
    }
};

export default function Page() {
    return <MakeNewFriendsCityPage cityKey="surat" cityName="Surat" dbCityName="Surat" />;
}

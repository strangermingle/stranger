import SponsoredAd from './ads/SponsoredAd';
import MembershipAd from './ads/MembershipAd';
import SidebarVideoAd from './ads/SidebarVideoAd';

export default function SponsoredAds() {
    return (
        <div className="space-y-8 w-full">
            <SponsoredAd />
            <MembershipAd />
            <SidebarVideoAd />
        </div>
    );
}

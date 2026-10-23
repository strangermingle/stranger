import SponsoredAd from './ads/SponsoredAd';
import MembershipAd from './ads/MembershipAd';

export default function SponsoredAds() {
    return (
        <div className="space-y-8 w-full">
            <SponsoredAd />
            <MembershipAd />
        </div>
    );
}


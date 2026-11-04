import MembershipCTA from './MembershipCTA';

export default function FacebookGroupCTA({ cityName }: { cityName?: string | null }) {
  return <MembershipCTA cityName={cityName} />;
}

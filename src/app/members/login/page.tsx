import { redirect } from 'next/navigation';

export default function MembersLoginPage() {
  redirect('/members?mode=login');
}

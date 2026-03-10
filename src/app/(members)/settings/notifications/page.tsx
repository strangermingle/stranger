import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import NotificationPrefsForm from '@/components/members/NotificationPrefsForm';

export const metadata = {
  title: 'Notification Settings | StrangerMingle',
  description: 'Manage how you receive updates and alerts.',
};

export default async function NotificationSettingsPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  // Fetch full user record for notification_prefs
  const { data: userData, error: userError } = await (supabase
    .from('users') as any)
    .select('notification_prefs')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
        <p className="text-red-500">Error loading settings. Please try again later.</p>
      </div>
    );
  }

  const prefs = ((userData as any).notification_prefs as Record<string, any>) || {};

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">
          Control which notifications you receive and how they are delivered.
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <NotificationPrefsForm initialPrefs={prefs} />
      </div>
    </div>
  );
}

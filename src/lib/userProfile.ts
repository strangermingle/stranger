import { callRpc } from './rpc-client';

export interface UserProfile {
    id: string;
    user_id: string | null;
    phone: string;
    email: string | null;
    name: string;
    created_at: string;
    updated_at: string;
}

/**
 * Create or update user profile
 * For guests: uses phone as identifier
 * For authenticated users: links to auth.users.id
 */
export async function createOrUpdateUserProfile(data: {
    phone: string;
    name: string;
    email?: string | null;
    user_id?: string | null;
}): Promise<UserProfile | null> {
    return callRpc('userProfile', 'createOrUpdateUserProfile', [data]);
}

/**
 * Get user profile by phone
 */
export async function getUserProfileByPhone(phone: string): Promise<UserProfile | null> {
    return callRpc('userProfile', 'getUserProfileByPhone', [phone]);
}

/**
 * Get user profile by user_id (for authenticated users)
 */
export async function getUserProfileByUserId(userId: string): Promise<UserProfile | null> {
    return callRpc('userProfile', 'getUserProfileByUserId', [userId]);
}

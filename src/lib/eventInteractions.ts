import { callRpc } from './rpc-client';

export async function toggleEventLike(eventId: string, userId: string, isLiked: boolean) {
    return callRpc('eventInteractions', 'toggleEventLike', [eventId, userId, isLiked]);
}

export async function toggleEventSave(eventId: string, userId: string, isSaved: boolean) {
    return callRpc('eventInteractions', 'toggleEventSave', [eventId, userId, isSaved]);
}

export async function setEventInterest(eventId: string, userId: string, interestType: 'interested' | 'going' | 'not_going' | null) {
    return callRpc('eventInteractions', 'setEventInterest', [eventId, userId, interestType]);
}

export async function submitEventReview(reviewData: {
    event_id: string;
    user_id: string;
    booking_id?: string;
    rating: number;
    title?: string;
    review_text?: string;
    rating_venue?: number;
    rating_host?: number;
    rating_value?: number;
}) {
    return callRpc('eventInteractions', 'submitEventReview', [reviewData]);
}

export async function checkUserInteraction(eventId: string, userId: string) {
    return callRpc('eventInteractions', 'checkUserInteraction', [eventId, userId]);
}

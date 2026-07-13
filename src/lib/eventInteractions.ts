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

export async function joinEventWaitlist(eventId: string) {
    return callRpc('eventInteractions', 'joinEventWaitlist', ['', eventId]);
}

export async function getEventDiscussions(eventId: string) {
    return callRpc('eventInteractions', 'getEventDiscussions', [eventId], { useCookies: false });
}

export async function postEventDiscussion(eventId: string, parentId: string | null, message: string) {
    return callRpc('eventInteractions', 'postEventDiscussion', ['', eventId, parentId, message]);
}

export async function likeEventDiscussion(messageId: string) {
    return callRpc('eventInteractions', 'likeEventDiscussion', ['', messageId]);
}

export async function deleteEventDiscussion(messageId: string) {
    return callRpc('eventInteractions', 'deleteEventDiscussion', ['', messageId]);
}

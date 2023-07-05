export default interface Event {
    id: number;
    createdAt?: Date;
    ownerId: number;
    title: string;
    description: string;
    startAt: string;
    finishAt: string;
    place: string;
    category: string;
    isBlocked: boolean;
}

export type EventId = Event['id'];

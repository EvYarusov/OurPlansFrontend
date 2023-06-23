export default interface Event {
    id: number;
    created_at: Date;
    author_id: number;
    title: string;
    description: string;
    start_at: Date;
    finish_at: Date;
    place: string;
    category: string;
    is_blocked: boolean;
}

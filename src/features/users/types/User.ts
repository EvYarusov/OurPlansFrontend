export default interface User {
    id: number;
    userName?: string;
    email: string;
    role?: string;
    full_name?: string;
    age?: number;
    gender?: string;
    blocked?: boolean;
}

export type UserId = User['id'];

import User from '../users/types/User';
import Event, { EventId } from './types/Event';

// добавить мероприятие - зарегистрированный пользователь
export async function addEvent(
    title: string,
    description: string,
    startAt: string,
    finishAt: string,
    place: string,
    category: string
): Promise<Event> {
    const res = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ title, description, startAt, finishAt, place, category }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status >= 400) {
        const { message } = await res.json();
        throw Error(message);
    }

    return res.json();
}

// посмотреть все мероприятия - зарегистрированный пользователь, админ, незарегистрированный
export async function getAll(): Promise<{ events: Event[] }> {
    const result = await fetch('/api/events');
    return result.json();
}

// посмотреть мероприятие по ID  - зарегистрированный пользователь, админ, незарегистрированный
export async function getEventById(id: EventId): Promise<Event> {
    const result = await fetch(`/api/events/${id}`);
    return result.json();
}

// посмотреть мероприятия по автору - зарегистрированный пользователь, админ
export async function getAllByAuthor(id: number): Promise<{ events: Event[] }> {
    const result = await fetch(`/api/events/byUser/${id}`);
    return result.json();
}

// удалить мероприятие - будет реализовано позже
export async function deleteEvent(id: number): Promise<Event> {
    const result = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    return result.json();
}

// посмотреть созданные мной мероприятия - зарегистрированный пользователь
export async function getAllMyEvents(): Promise<{ events: Event[] }> {
    const result = await fetch('/api/events/author/me');
    return result.json();
}

// посмотреть мероприятия c моим участием - будет реализовано позже
export async function getAllWithMe(): Promise<{ events: Event[] }> {
    const result = await fetch('/api/events/members/me');
    return result.json();
}

// принять участие в мероприятии - зарегистрированный пользователь
export async function attendEvent(id: EventId): Promise<number> {
    const result = await fetch(`/api/events/${id}/members/me`, { method: 'POST' });
    return result.json();
}

// посмотреть всех пользователей зарегистрировавшихся на мероприятие
// - зарегистрированный пользователь, админ
export async function getEventMembers(id: EventId): Promise<User[]> {
    const result = await fetch(`/api/events/${id}/members`);
    return result.json();
}

// покинуть мероприятие - зарегистрированный пользователь
export async function retireEvent(id: EventId): Promise<number> {
    const result = await fetch(`/api/events/${id}/members/me`, { method: 'PUT' });
    return result.json();
}

// Заблокировать мероприятие - админ
export async function blockEvent(id: EventId, status: boolean): Promise<Event> {
    const result = await fetch(`/api/events/${id}/block?isBlock=${status}`, { method: 'PUT' });
    return result.json();
}

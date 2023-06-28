import Event from './types/Event';

// eslint-disable-next-line import/prefer-default-export
export async function getAll(): Promise<{ events: Event[] }> {
    const result = await fetch('/api/events');
    return result.json();
}

export async function deleteEvent(id: number): Promise< Event > {
    const result = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    return result.json();
}

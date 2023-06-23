// eslint-disable-next-line import/prefer-default-export
export async function getAll(): Promise<{ events: Event[] }> {
    const result = await fetch('/api/events');
    return result.json();
}

// посмотреть все места - зарегистрированный пользователь, админ, незарегистрированный
// eslint-disable-next-line import/prefer-default-export
export async function getAllPlaces(): Promise<{ strings: string[] }> {
    const result = await fetch('/api/events/all_places');
    return result.json();
}

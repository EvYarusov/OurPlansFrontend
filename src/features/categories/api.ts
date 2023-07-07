// посмотреть все категории - зарегистрированный пользователь, админ, незарегистрированный
// eslint-disable-next-line import/prefer-default-export
export async function getAllCategories(): Promise<{ strings: string[] }> {
    const result = await fetch('/api/events/all_category');
    return result.json();
}

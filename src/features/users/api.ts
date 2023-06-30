import User, { UserId } from './types/User';

// посмотреть всех пользователей - админ
export async function getAllUsers(): Promise<{ users: User[] }> {
    const result = await fetch('/api/users');
    return result.json();
}

// посмотреть пользователя по ID
// - зарегистрированный пользователь (если искомый пользователь не заблокирован), админ
export async function getUserById(id: UserId): Promise< User > {
    const result = await fetch(`/api/users/${id}`);// поправить бэк и потом тут!!
    return result.json();
}

// заблокировать пользователя - админ
export async function blockUser(id: UserId): Promise< User > {
    const result = await fetch(`/api/users/${id}/block`, {
      method: 'PUT',
    });
    return result.json();
}

// разблокировать пользователя - админg
export async function unblockUser(id: UserId): Promise< User > {
    const result = await fetch(`/api/users/${id}/unblock`, {
      method: 'PUT',
    });
    return result.json();
}

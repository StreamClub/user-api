

export const generateUsername = (email: string, userId: string): string => {
    const emailParts = email.split('@');
    const username = `${emailParts[0]}${userId}`;
    return username;
}
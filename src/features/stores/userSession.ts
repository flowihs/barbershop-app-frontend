
let userId: number | null;
let userRole: string | null;

export const setUserId = (id: number) => {
    userId = id
}

export const setRole = (role: string) => {
    userRole = role;
}

export const getUserId = () => {
    if (!userId) throw new Error("The id is undentified");
    return userId;
}

export const getUserRole = () => {
    if (!userRole) throw new Error("The role in undentified");
    return userRole;
}

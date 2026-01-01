
export interface UserProfile {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    created_at: string;
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    user_id: string;
    created_at: string;
}
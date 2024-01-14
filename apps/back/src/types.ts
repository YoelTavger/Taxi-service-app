export interface UserType {
    user_id?: number;
    user_name: string;
    password: string;
    email: string;
    full_name: string;
    phone_number: string;
    created_at?: Date;
}
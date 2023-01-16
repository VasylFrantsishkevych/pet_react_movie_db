export interface ICast {
    id: number,
    known_for_department: string,
    original_name: string,
    profile_path: string,
}

export interface ICastResponse {
    id: number;
    cast: ICast[];
}
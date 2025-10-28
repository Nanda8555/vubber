export interface IProject {
    originalLanguage: string | null;
    "GSI2-SK": string;
    updatedAt: string;
    status: string;
    createdAt: string;
    SK: string;
    isDeleted: boolean;
    "GSI2-PK": string;
    description: string;
    PK: string;
    title: string;
}

export interface ICreateProject {
    title: string;
    description: string;
    videos: File[];
}

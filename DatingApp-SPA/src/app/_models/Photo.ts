import { User } from './User';

export interface Photo {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
    User: User;
    UserID: number;
}

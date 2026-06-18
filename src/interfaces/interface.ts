export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    key: string;
    user_Id: number;
}

export interface EventEdit {
    content: {
        id: number;
        title: string;
        description: string;
        date: string;
        key: string;
        user_Id: number;
    }
    token: string;
}

export interface EventToAdd{
    title: string;
    description: string;
    date: string;
    user_Id: string | undefined;
    key: string;
}

export interface UserLogin {
    email: string,
    password: string
}

export interface loginRes{
    id: number,
    token: string
}

export interface user{
    name: string,
    age: number,
    email: string,
    events: Array<Event> | undefined
}

export interface deleteEvent {
    eventId: number,
    userId: number 
}
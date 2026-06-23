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

export interface certificadoData{
    email: string;
    key: string
}

export interface certificado {
    eventTitle: string;
    userName: string ;
    description: string ;
    date: string;
}

export interface registerEventData{
    eventId: number;
    userId: number;
}

export interface commentary{
    id: number,
    commentary: string,
    userName: string
}

export interface commentPost{
    eventId: number,
    userId: number,
    comment: string
}

export interface commentPostRes{
    id: number,
    commentary: string,
    userId: number,
    eventId: number
}

export interface usersRegistersInEvents{
    id: number,
    name: string,
    age: number,
    email: string
}

/*{
  "name": "",
  "age": 1,
  "email": "",
  "password": ""
} */

export interface registerUser{
    name: string, 
    age: number,
    email: string,
    password: string
}

export interface registerReturn{
    id: number,
    name: string, 
    age: number,
    email: string,
}
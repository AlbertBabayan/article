export interface ILoginUser {
    result: {
        id: number;
        name: string;
        email:string;
        phone: string;
    }
    token: string;
}

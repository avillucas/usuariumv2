export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,            
    },
    loguedIn:boolean    
}
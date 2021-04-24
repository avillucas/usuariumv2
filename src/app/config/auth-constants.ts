export class AuthConstants {
    public static readonly AUTH = 'userData'    
    public static validarAdministrador(usuario:string){
        return usuario =='admin@admin.com';
    } 
    public static readonly IS_ADMIN = 'isAdmin'
    public static readonly LOGIN_PATH = 'auth/login';
    public static readonly REGISTER_PATH = 'auth/register';
};
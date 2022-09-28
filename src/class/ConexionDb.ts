// import mysql from "mysql";
// import { HOST, USER, PASSWORD, DATABASE, PORTDB, CHARSET} from "../config/Config"

// export class ConexionDB
// {
//   private readonly HOST:String | Number | any  = HOST;
//   private readonly USER:String | Number | any  = USER;
//   private readonly PASSWORD:String | Number | any  = PASSWORD;
//   private readonly  DATABASE:String | Number | any  =  DATABASE;
//   private readonly  CHARSET:String | Number | any  =  CHARSET;
//   private readonly PORTDB:Number | Number | any  =  PORTDB;

//     public async conectionMysql() {
        
//         try {

//             const connectDb = await mysql.createConnection( {
                
//                 host: this.HOST,
//                 user: this.USER,
//                 password: this.PASSWORD,
//                 database: DATABASE,
//                 charset: this.CHARSET,
//                 port: this.PORTDB


//             } )
//           const res = connectDb.connect( ( error ) => {
//                 if ( error ) {
                    
//                 return  "error";
                  
                  
//                 } else {
//                    return "Conexion exitosa";
                    
                    
//               }
              
              
//           } )
          
            
//             return connectDb;
           
//         } catch ( error ) {
            
//            console.log("Algo salio inesperado intentar de nuevo");
           
            
//         }
       

//    }
// }

// export const conexion = new ConexionDB()

import { createPool } from "mysql";

 export class Conexion 
{
    public readonly host:string | any = "localhost";
    private readonly user:string | any = "root";
    private readonly password:string | any = "";
    protected readonly database:string | any  = "systembotos";
    private readonly charset:string | any  = "utf8";
    private readonly port:Number | string |any = 3306;

     public async connect() {
   const conenct = await createPool({
        
            host: this.host, 
            user: this.user,
            password: this.password,
            database: this.database,
            charset: this.charset,
            port: this.port
        })
        return conenct;
}
}

export const conexion = new Conexion() 

import {json, Request ,Response} from "express"
import  bcrypt from "bcrypt"
import {conexion} from "../class/ConexionDb"
import session, { Session } from "express-session";
class ControllerUser {
    public async sigNUpC(req: Request, res: Response): Promise<any> {
        try {
            const { correo, password } = req.body;
            const connectDb = await conexion.connect();

            const roundNumber = 10;
            const encriptarPassword = await bcrypt.genSalt(roundNumber);
            const hasPassword = await bcrypt.hash(password, encriptarPassword);
            if (correo !== null && password !== null) {
                connectDb.query("SELECT * FROM admin",(error,rows)=>{
                        for (let i = 0; i < rows.length; i++) {
                            if (rows[i].correo == correo) {
                                return res.json({ message: "EMAIL_EXIST"});      
                            }
                            
                        }
                        connectDb.query(
                            "INSERT INTO admin(correo, password) VALUES (?, ?)",
                            [correo, hasPassword],
                            (error, rows) => {
                                if (rows) {
                                   
                                return res.json({ message: "insetUser"});
                                      
                                }
        
                                if (error) {
                                    return res.json({ mesage: error, err: "Error" });
                                }
                            }
                        );
                    
                })
               
               
            } 
        } catch (error) { 
            res.json({ message: "Error 404" });
        }
    }

    public async loginUser(req: Partial<Request>, res: Response) {
        const { correo, password } = req.body;
        const connectDb = await conexion.connect();
        connectDb.query(
            "SELECT  password, idAdmin FROM admin WHERE correo = ?",
            [correo],
            async (error, rows) => {
                if (rows.length > 0) {
                    const passwordAuth = rows[0].password;
                    const passVerify = await bcrypt.compare( password, passwordAuth );
                    console.log(req.session);
                    
                    if ( passVerify ) {
                           let sessions;
                  
                    sessions = req?.session!
                    sessions.idUser = rows[0].idAdmin;
                        
                        console.log( sessions.idUser);
                        
                        res.json({message:"SUCCESFULUSER"})
                        
                    } else {
                        
                        res.json({message:"EROORUSER"})
                    }
                }

                if (error) {
                  
                    return res.json({ message: error });
                }
            }
        );
  }
  

    public async loginUpdate() {
        
    }
      public async createElection(req:any, res: Response): Promise<any> {
    try {
      

    let sessions;
  sessions = req?.session!;
        console.log(req.body);
            
      if (sessions.idUser) {
 const {
        descripcion,
        cargo,
        estado
      } = req.body;

        
      const connectDb = await conexion.connect();
        connectDb.query(
          "INSERT INTO elecciones ( descripcion, cargo, estado, idAdmin1) VALUES (?, ?, ?, ?)",
          [ descripcion, cargo, estado,sessions.idUser ],
          ( error, rows ) => {
            
            if (rows) {
              console.log(rows);
              
              return res.json({ data:"INSERTELLECCION" });
              
            } else {
              
              console.log("sss",error);
              
              return res.json({ data: "ERRDATA" });
            }
              
           
          }
        );
     
      } else {
          res.json({data:"INICIESESSION"})
        
      }
     
    } catch (error) {
      res.json({ data: "Error 404" });
    }
  }

}

export const constrollersUser = new ControllerUser();

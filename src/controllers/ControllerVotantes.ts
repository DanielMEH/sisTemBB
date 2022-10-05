import { Request, Response } from "express";
import Connection from "mysql2/typings/mysql/lib/Connection";
import { conexion } from "../class/ConexionDb";
class Votantes{

    public async readVotantes(req:Request, res:Response) {
        try {
            const connection = await conexion.connect()
            connection.query( "SELECT * FROM votantes ", ( error, rows ) => {
                
                
                  if (rows) {
                    res.json({message: rows})
                    
                }
                  if ( error ) {
                    console.log("error", error);
                    
                      res.json({message:"ERROR_VIEW_VOTANTES"})
                    
                  }
            })
            
        } catch (error) {
            
        }
    }
    public async creatVotantes( req: Request, res: Response ): Promise<any>{
        
      try {
        const { documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2 } = req.body
          const connection = await conexion.connect()
          connection.query( "INSERT INTO votantes(documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2) VALUES(?,?,?,?,?)",
              [documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2], ( error, rows ) => {
              
                  if (rows) {
                    res.json({message:"INSERT_VOTANTES"})
                    
                }
                  if ( error ) {
                    console.log("error", error);
                    
                      res.json({message:"ERROR_INSERT_VOTANTES"})
                    
                  }
          })
      } catch (error) {
        
      }
        
    }
    public async updateVotantes(req:Request, res:Response) {
        
         try {
        const {documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2 } = req.body

            const connection = await conexion.connect();
            
            connection.query("UPDATE votantes SET documento =?, nombresApellidos=?, programaFormacion=?, fichaPrograma=?, idEleccion2=? WHERE documento = ?",
            [documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2,req.params.id], ( error, rows ) => {
                if ( rows ) {
                   return  res.json({message:"UploadData"})
                    
                }
                if (error) {
                    console.log(error);
                    
                    return res.json({message:"ErrorUploadData"})
                }
                
            })
        } catch (error) {
            
            res.json({data:"ERRUPLOAD"})
        }
    }
    public async deletVotantes(req:Request, res:Response) {
        
        try {
            try {
            const { id } = req.params;
            
            const connection = await conexion.connect();
            connection.query("DELETE FROM votantes WHERE documento = ?", [id], async ( error, rows ) => {
            
                
                if (rows) {
                    
                    return await res.json({message:"deleteexit"})
                }else if (error) {
                    
                    return await res.json({message:"deleteexit"})
                }
            })
        } catch (error) {
            
            res.json({data:"ERRUPLOAD"})
      }
            
        } catch (error) {
            
        }
    }
    public async viewsVotantes(req:Request, res:Response) {
        try {
            const { id } = req.params;
            const connection = await conexion.connect()
            connection.query( "SELECT * FROM votantes WHERE idEleccion2 = ? ",[id], ( error, rows ) => {
                
                
                  if (rows) {
                    res.json({message: rows})
                    
                }
                  if ( error ) {
                    console.log("error", error);
                    
                      res.json({message:"ERROR_VIEW_VOTANTES"})
                    
                  }
            })
            
        } catch (error) {
            
        }
    }

    public async updatvotantesfine( req: Request, res: Response ) {
       
        try {
           let  emitioVoto = "Si"
           let  estado = "Inactivo"
            const { id } = req.params
            const { documento1 } = req.body
            console.log(documento1);
            
            const connection = await conexion.connect();

            connection.query( "SELECT * FROM votantes WHERE documento = ?", [id], ( error, rows ) => {
                
                if ( rows ) {
                    
                    for (let i = 0; i < rows.length; i++) {
                        if ( rows[i].estado == "Activo" ) {
                            
                     connection.query( "UPDATE votantes SET emitioVoto = ?, estado=?, documento1=? WHERE documento = ?",
                         [emitioVoto, estado, documento1, id], ( error, rows ) => {
                             if ( rows ) {
                                 connection.query( `UPDATE candidato SET totalVotos = totalVotos + ${1} WHERE documento = ?`,
                                     [ documento1], ( error, rows ) => {
                                         if ( rows ) {
                                         
                                            return res.json({message:"Tu voto fue registrado exitosamentegracias por participar"})
                                             
                                            } else if ( error ) {
                                            return res.json({message:"El voto no fue registrado"})
                                             
                                     }
                                 })
                            
                             } else if ( error ) {
                             
                                 return res.json({message: "ERR_UPD_VOT"})
                         }
             })
                               
                        } else if(rows[i].estado == "Inactivo") {
                            return res.json({message:"Ya votaste o estas inactivo"})
                            
                        }
                        
                    }
                    
                }
                if (error) {
                    res.json({message:error})
                }
            })
            // connection.query( "UPDATE votantes SET emitioVoto = ?, estado=?, documento1=? WHERE documento = ?",
            //     [emitioVoto, estado, documento1, id], ( error, rows ) => {

            //         if (rows) {
                        
            //         }
                
            // })

        } catch (error) {
            
        }
        
        
    }

}

 
export const votantes = new Votantes()
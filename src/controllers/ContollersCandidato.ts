import { Request, Response } from "express";
import { conexion } from "../class/ConexionDb";
class ControllerCandidato {

    public async candidatosViws( req: Request, res: Response ): Promise<any>{
       try {
         const connection = await conexion.connect();

        connection.query( "SELECT * FROM candidato WHERE idEleccion1 = ? ",[req.params.id], (error, rows) => {
            console.log(rows);
            
            if ( rows.length > 0 ) {

                return res.json( { data: rows } )
                
            } else {
               return  res.json({data:"ERRUPLOAD_CAND"})
                
            }
            if ( error ) {
                
                return res.json( { data: "ERRDATA" } )
            }
        }) 
       } catch ( error ) {
           res.json({data:"ERRUPLOAD"})
           
        }      
    }
    public async postCandidato( req: Request, res: Response ): Promise<any>{
        
        try {
             const { id } = req.params
        const { documento, imgUrl, imgId, nombreCandidato, programaFormacion,
            fichaPrograma, estado, totalVotos } = req.body

        const connection = await conexion.connect();
        connection.query("INSERT INTO candidato (documento, imgUrl, imgId, nombreCandidato, programaFormacion,fichaPrograma, estado, totalVotos,idEleccion1) VALUES(?,?,?,?,?,?,?,?,?)",
        [documento, imgUrl, imgId, nombreCandidato, programaFormacion,
                fichaPrograma, estado, totalVotos, id], ( error:any, rows:any ) => {
            
            if (rows) {

                return res.json({message:"POSTCANDIDATO"})
                
            } else if ( error ) {
                
                return res.json({message:"ERRORPOSTCANDIDATO"})
            }else if(error == "ER_DUP_ENTRY")
            
            return res.json({message:"CAND_EXIST"})
                
            
            
            }
        )

        } catch (error) {
            
            res.json({data:"ERRUPLOAD"})
        }
        
    }
    public async updateCandidato( req: Request, res: Response ): Promise<void>{
        try {
        const { documento, imgUrl, imgId, nombreCandidato, programaFormacion,
            fichaPrograma, estado, totalVotos } = req.body

            const connection = await conexion.connect();
            
            connection.query("UPDATE candidato SET documento =?, imgUrl=?, imgId=?, nombreCandidato=?, programaFormacion=?,fichaPrograma=?, estado=?, totalVotos=? WHERE documento = ?",
            [documento, imgUrl, imgId, nombreCandidato, programaFormacion,
                    fichaPrograma, estado, totalVotos,req.params.id], ( error, rows ) => {
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
    public async deleteCandidato( req: Request, res: Response ): Promise<any>{
        
        try {
            const { id } = req.params;
            
            const connection = await conexion.connect();
            connection.query( "DELETE FROM candidato WHERE documento = ?", [id], async ( error, rows ) => {
                if (rows) {
                    
                    return await res.json({message:"deleteexit"})
                }
                
                if (error) {
                    
                    return await res.json({message:"deleteexit"})
                }
            })
        } catch (error) {
            
            res.json({data:"ERRUPLOAD"})
      }



        
    }


}

export const  controllerCandidato = new ControllerCandidato();
import { Request, Response } from "express";
import { conexion } from "../class/ConexionDb";
import {uploadImage, deleteImage} from "../utils/cloudinary"
import fs from "fs-extra"

class ControllerCandidato {
    public async candidatosvistaCom( req: Partial<Request>, res: Partial<Response> ): Promise<any>{
        try {
          const connection = await conexion.connect();
       
          
         connection.query( "SELECT * FROM candidato", (error, rows) => {
             
             if(error){
                return  res.json({data:"ERRUPLOAD_CAND"})
             }
             if ( rows.length > 0 ) {
 
                 return res.json( { data: rows } )
                 
             } else{
                 return  res.json({data:"NOT_FOUND_RESULT"})
 
             }
             
            
         }) 
        } catch ( error ) {
            res.json({data:"ERRUPLOAD"})
            
         }      
     }
    public async candidatosvista( req: Partial<Request>, res: Partial<Response> ): Promise<any>{
        try {
          const connection = await conexion.connect();
          const id = req.params.id;
          let idConvert = parseInt(id)
         connection.query( "SELECT * FROM candidato WHERE documento = ? ",[idConvert], (error, rows) => {
             console.log(rows);
             
             if(error){
                return  res.json({data:"ERRUPLOAD_CAND"})
             }
             if ( rows.length > 0 ) {
 
                 return res.json( { data: rows } )
                 
             } else{
                 return  res.json({data:"NOT_FOUND_RESULT"})
 
             }
             
            
         }) 
        } catch ( error ) {
            res.json({data:"ERRUPLOAD"})
            
         }      
     }
    public async candidatosViws( req: Request, res: Response ): Promise<any>{
       try {
         const connection = await conexion.connect();
         const id = req.params.id;
         let idConvert = parseInt(id)

         
        connection.query( "SELECT * FROM candidato WHERE idEleccion1 = ? ",[idConvert], (error, rows) => {
      
            
            if(error){
               return  res.json({data:"ERRUPLOAD_CAND"})
            }
            if ( rows.length > 0 ) {

                return res.json( { data: rows } )
                
            } else{
                return  res.json({data:"NOT_FOUND_RESULT"})

            }
            
           
        }) 
       } catch ( error ) {
           res.json({data:"ERRUPLOAD"})
           
        }      
    }
    public async postCandidato( req: any, res: Response ){
        
        try {
            
            let url_imagen = null;
            let id_img = null;
            console.log(req.body)
            console.log(req.files);
            
  
            if(req.files?.imagen){
                const result = await  uploadImage( req.files?.imagen.tempFilePath! )
                url_imagen = result.secure_url;
                id_img = result.public_id;
                
                await fs.remove(req.files?.imagen.tempFilePath)
            }

            
        const { documento,  nombreCandidato, programaFormacion,
            fichaPrograma, estado, totalVotos, id} = req.body

        const connection = await conexion.connect();
        connection.query("INSERT INTO candidato (documento, imgUrl, imgId, nombreCandidato, programaFormacion,fichaPrograma, estado, totalVotos,idEleccion1) VALUES(?,?,?,?,?,?,?,?,?)",
        [documento, url_imagen, id_img, nombreCandidato, programaFormacion,
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
    public async updateCandidato( req: any, res: Response ): Promise<any>{
        try {

            const connection = await conexion.connect();

            connection.query( "SELECT * FROM candidato WHERE documento = ?", [req.params.id],
               async ( error, rows ) => {
                if(rows) {

                   await deleteImage(rows[0].imgId)
                }
            })
            let url_imagen = null;
            let id_img = null;
  
            if(req.files?.imagen){
                const result = await  uploadImage( req.files?.imagen.tempFilePath! )
                url_imagen = result.secure_url;
                id_img = result.public_id;
                
            }

            await fs.remove(req.files?.imagen.tempFilePath)
        const { documento,  nombreCandidato, programaFormacion,
            fichaPrograma, estado, totalVotos } = req.body

            
            connection.query("UPDATE candidato SET documento =?, imgUrl=?, imgId=?, nombreCandidato=?, programaFormacion=?,fichaPrograma=?, estado=?, totalVotos=? WHERE documento = ?",
            [documento, url_imagen, id_img, nombreCandidato, programaFormacion,
                    fichaPrograma, estado, totalVotos,req.params.id], ( error, rows ) => {
                if ( rows ) {
                   return  res.json({message:"UploadData"})
                    
                }
                if (error) {
                    
                    
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
            
            connection.query( "SELECT * FROM candidato WHERE documento = ?", [parseInt(req.params.id)],
                async ( error, rows ) => {
                    
                  
                if(rows) {

                   await deleteImage(rows[0].imgId)
                }
            })
            connection.query("DELETE FROM candidato WHERE documento = ?", [parseInt(req.params.id)], async ( error, rows ) => {
                if ( rows ) {
                
                    return  res.json({message:"SUCCESFULL_DELETE_CAN"})
                }
                
                if (error) {
                    
                    return res.json({message:"ERROR_DELETE_CAN"})
                }
            })
        } catch (error) {
            
            res.json({data:"ERRUPLOAD"})
      }
        
    }


}

export const  controllerCandidato = new ControllerCandidato();
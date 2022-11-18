import { Request, Response } from "express";
import { conexion } from "../class/ConexionDb";

class controlElections {

  public async electionId(req: Request, res: Response): Promise<any> {
    try {

      // let sessions:any;

      // sessions = req.session;

      // if (sessions.idUser ) {
        
        const connectDb = await conexion.connect();
        connectDb.query("SELECT * FROM elecciones WHERE idEleccion = ?", [req.params.id], async(error, rows) => {
          if (!error) {
            return await  res.json({ data: rows });
          } else {
            return await  res.json({ data: error });
          }
        });
        
      // } else {
        
      //   res.json({message:"INICIESESSION"})
      // }
    } catch (error) {
      res.json({ message: "error 404" });
    }
  }
  
  public async readElections(req: Request, res: Response): Promise<any> {
    try {

      // let sessions:any;

      // sessions = req.session;

      // if (sessions.idUser ) {
        
        const connectDb = await conexion.connect();
        connectDb.query("SELECT * FROM elecciones", async(error, rows) => {
          if (!error) {
            return await  res.json({ data: rows });
          } else {
            return await  res.json({ data: error });
          }
        });
        
      // } else {
        
      //   res.json({message:"INICIESESSION"})
      // }
    } catch (error) {
      res.json({ message: "error 404" });
    }
  }


  public async updateColection(req: Request, res: Response): Promise<any> {
    try {
      const {
        descripcion,
        cargo,
        estado
      } = req.body;
      const connectDb = await conexion.connect();

      
      connectDb.query(
        "UPDATE elecciones SET  descripcion = ?, cargo = ?, estado = ?   WHERE idEleccion = ?",
        [descripcion, cargo, estado, req.params.id ],
        (error, rows ) => {
            if (rows) {
             
              return res.json({ message: "ELLECUPDATE" });
            } else {
  
              
              return res.json({ message: "ERRORUPDATE" });
            }
          }
        )
      
    } catch (error) {
      res.json({ message: "Error 404" });
    }
  }

  public async deleteElection(req: Request, res: Response): Promise<any> {
    try {

      const idEleccion = parseInt(req.params.idEleccion)
      
     
      
      
      const connectDb = await conexion.connect();
      connectDb.query(
        "DELETE FROM elecciones WHERE idEleccion = ?",
        [idEleccion],
        ( error, rows ) => {
     
          
          if (rows) {
            return res.json({ message: "DELETEELECCION" });
          } else {
            res.json({ message: "ERRDELETEELECC" });
          }
        }
      );
    } catch (error) {
      res.json({ message: "Error 404" });
    }
  }
}

export const ControlElections = new controlElections();

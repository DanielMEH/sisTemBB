import { Request, Response, json } from 'express';
import Connection from "mysql2/typings/mysql/lib/Connection";
import { conexion } from "../class/ConexionDb";
import fs from 'fs-extra'
import csvtojson from "csvtojson";
class Votantes {
    public async bestVotos( req: Request, res: Response  ) {
        const connection = await conexion.connect();
      connection.query("SELECT * FROM votantes  WHERE id = ?",[parseInt(req.params.id)], (error, rows) => {
        console.log(rows);
        if (error) {
          res.json({ message: "ERROR_VIEW_VOTANTES" });
        }
        if (rows.length > 0) {
          
          res.json({ message: rows });
        } else {
          res.json({ message: "ERROR_VIEW_CODE" });
        }
      });
    }
   public async textUpdate( req: Request, res: Response ) {
        
     const connection = await conexion.connect();
     const { textG } = req.body;
     connection.query( "UPDATE titulo SET text = ? ", [textG], ( error, rows ) => {
       if ( rows ) {
          return res.json({ message: "SUCCESFULL_TEXT" });
        
       }
       
       
     })
    }

 public async getTitle(req: Request, res: Response ) {
       const connection = await conexion.connect();
   connection.query( "SELECT * FROM titulo ", ( error, rows ) => {
        
        
        if (error) {
          res.json({ data: "ERROR_VIEW_TITLE" });
        }
        if (rows.length > 0) {
          res.json({ data: rows });
        } else {
          res.json({ data: "ERROR_TITLE" });
        }
      });
  }
  public async readVotantes(req: Request, res: Response) {
    try {
      const connection = await conexion.connect();
      connection.query("SELECT * FROM votantes ", (error, rows) => {
        console.log(rows);
        if (error) {
          res.json({ message: "ERROR_VIEW_VOTANTES" });
        }
        if (rows.length > 0) {
          
          res.json({ message: rows });
        } else {
          res.json({ message: "ERROR_VIEW_CODE" });
        }
      });
    } catch (error) {}
  }
  public async creatVotantes(req: Request, res: Response): Promise<any> {
    try {
      const {
        documento,
        nombresApellidos,
        programaFormacion,
        fichaPrograma,
        idEleccion2,
      } = req.body;
      const connection = await conexion.connect();
      connection.query(
        "INSERT INTO votantes(documento, nombresApellidos, programaFormacion, fichaPrograma, idEleccion2) VALUES(?,?,?,?,?)",
        [
          documento,
          nombresApellidos,
          programaFormacion,
          fichaPrograma,
          idEleccion2,
        ],
        (error, rows) => {
          if (rows) {
            return res.json({ message: "INSERT_VOTANTES" });
          }
          if (error) {
            return res.json({ message: "ERROR_INSERT_VOTANTES" });
          }
        }
      );
    } catch (error) {}
  }
  public async updateVotantes(req: Request, res: Response) {
    try {
      const {
        documento,
        nombresApellidos,
        programaFormacion,
        fichaPrograma,
        idEleccion2,
        estado
      } = req.body;

      console.table(req.body);
      
      const connection = await conexion.connect();

      connection.query(
        "UPDATE votantes SET documento =?, nombresApellidos=?, programaFormacion=?, fichaPrograma=?, idEleccion2=?, estado = ? WHERE id = ?",
        [
          documento,
          nombresApellidos,
          programaFormacion,
          fichaPrograma,
          idEleccion2,
          estado,
          req.params.id,
        ],
        (error, rows) => {
          if (rows) {
            
            return res.json({ message: "UploadData" });
          }
          if (error) {

            return res.json({ message: "ErrorUploadData" });
          }
        }
      );
    } catch (error) {
      res.json({ data: "ERRUPLOAD" });
    }
  }
  public async deletVotantes(req: Request, res: Response) {
    try {
      try {
        const { id } = req.params;

        const connection = await conexion.connect();
        connection.query(
          "DELETE FROM votantes WHERE documento = ?",
          [id],
          async (error, rows) => {
            if (rows) {
              return await res.json({ message: "exito" });
            } else if (error) {
              return await res.json({ message: "deleteexit" });
            }
          }
        );
      } catch (error) {
        res.json({ data: "ERRUPLOAD" });
      }
    } catch (error) {}
  }
  public async viewsVotantes(req: Request, res: Response) {
    try {
      const { documento } = req.body;
      const documentInt = parseInt(documento);

      console.log(documentInt);
      
      const connection = await conexion.connect();
      connection.query(
        "SELECT * FROM votantes WHERE documento= ? ",
        [documentInt],
        ( error, rows ) => {
          
          if (error) {
            return res.json({ message: "ERROR_VIEW_VOTANTES" });
          }
          if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
              if (rows[i].estado == "Activo") {
                return res.json({ message: "SUCCESFULL_VIEW" });
              } else {
                return res.json({ message: "USER_IS_INACTIVE" });
              }
            }
          } else {
            return res.json({ message: "ERROR_NOT_EXIXT" });
          }
        }
      );
    } catch (error) {
      return res.json({ message: error });
    }
  }

  public async electVotante(req: Request, res: Response) {
    const { documento } = req.params;
    const connection = await conexion.connect();

    connection.query(
      "SELECT * FROM votantes WHERE documento = ?",
      [documento],
      (error, rows) => {
        if (error) {
          return res.json({ message: "ERROR_DB" });
        }
        if (rows.length > 0) {
          connection.query(
            "SELECT * FROM  elecciones WHERE idEleccion = ?",
            [rows[0].idEleccion2],
            (error, rows) => {
              if (error) {
                return res.json({ message: "ERROR_DB" });
              }
              if (rows.length > 0) {
                if (rows[0].estado == "Inactivo") {
                  return res.json({ message: "ELECC_NOT_ACTIVE" });
                }
                return res.json({ message: rows });
              } else {
                return res.json({ message: "ERROR_NOT_EXIXT" });
              }
            }
          );
        } else {
          return res.json({ message: "ERROR_NOT_EXIXT" });
        }
      }
    );
  }
  public async updatvotantesfine(req: Request, res: Response) {
    try {
      let emitioVoto = "Si";
      let estado = "Inactivo";
      const { idk, documento1 } = req.params;

      console.log("ddddd",idk, documento1);

      const connection = await conexion.connect();

      connection.query(
        "SELECT * FROM votantes WHERE documento = ?",
        [idk],
        (error, rows) => {
         
          if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
              if (rows[i].estado == "Activo") {
                connection.query(
                  "UPDATE votantes SET emitioVoto = ?, estado=? WHERE documento = ?",
                  [emitioVoto, estado,  parseInt(idk)],
                  (error, rows) => {
                    if (rows) {
                     
                      connection.query(
                        `UPDATE candidato SET totalVotos = totalVotos+1 WHERE documento = ?`,
                        [parseInt(documento1)],
                        (error, rows) => {
                          if (rows) {

                            return res.json({ message: "GOOD_GOOD" });
                          } else if (error) {
                            return res.json({
                              message: "El voto no fue registrado",
                            });
                          }
                        }
                      );
                    } else if (error) {
                      return res.json({ message: "ERR_UPD_VOT" });
                    }
                  }
                );
              } else if (rows[i].estado == "Inactivo") {
              }
            }
          } else {
            return res.json({ message: "ERR_NOT_USER" });
          }
          if (error) {
            res.json({ message: error });
          }
        }
      );
      // connection.query( "UPDATE votantes SET emitioVoto = ?, estado=?, documento1=? WHERE documento = ?",
      //     [emitioVoto, estado, documento1, id], ( error, rows ) => {

      //         if (rows) {

      //         }

      // })
    } catch (error) {
      return res.json({ message: error });
    }
  }

  public async postFileCsv(req: any, res: any) {
    try {
      const connection = await conexion.connect();
      let fileName = req.files.CsvArchivo.tempFilePath;
      console.log(fileName);

      csvtojson()
        .fromFile(fileName)
        .then(async(source)  => {
          let idEleccion2 = 1;
          for (let i = 0; i < source.length; i++) {
            let documento = source[i]["documento"],
              nombresApellidos = source[i]["nombresApellidos"],
              programaFormacion = source[i]["programaFormacion"],
              fichaPrograma = source[i]["fichaPrograma"];

            console.log(
              documento,
              nombresApellidos,
              programaFormacion,
              fichaPrograma
            );
            let insertStatement = `INSERT INTO votantes (documento, nombresApellidos, programaFormacion, fichaPrograma,idEleccion2)
                     VALUES(?, ?, ?, ?,?)`;
            let data = [
              documento,
              nombresApellidos,
              programaFormacion,
              fichaPrograma,
              idEleccion2,
            ];

            connection.query(insertStatement, data, async (err, rows) => {
              if (err) return res.json({message:"ERROR_INSERT_CSVFILE"}); 
            });
          }
          await fs.remove(req.files.CsvArchivo.tempFilePath)
          return res.json({message:"SUCCESSFULL_INSERT_CSVFILE"});
        
        });
    } catch (error) {}
  }
}

export const votantes = new Votantes();

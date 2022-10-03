import { Request, Response } from "express";
import { conexion } from "../class/ConexionDb";

class controlElections {
  
  public async readElections(req: Request, res: Response): Promise<any> {
    try {
      const connectDb = await conexion.connect();
      connectDb.query("SELECT * FROM elecciones", (error, rows) => {
        if (!error) {
          return res.json({ message: rows });
        } else {
          return res.json({ message: error });
        }
      });
    } catch (error) {
      res.json({ message: "error 404" });
    }
  }

  public async createElection(req: Request, res: Response): Promise<any> {
    try {
      const {
        idEleccion,
        descripcion,
        cargo,
        fechaRegistro,
        estado,
        idAdmin1,
      } = req.body;

      const connectDb = await conexion.connect();

      if (idAdmin1) {
        connectDb.query(
          "INSERT INTO elecciones ( idEleccion, descripcion, cargo, fechaRegistro, estado, idAdmin1) VALUES (?, ?, ?, ?, ?, ?)",
          [idEleccion, descripcion, cargo, fechaRegistro, estado, idAdmin1],
          (error, rows) => {
            if (idAdmin1) {
              console.log("Insertado!");
              console.log(rows);
              return res.json({ message: rows });
            } else {
              return console.log(error);
            }
          }
        );
      } else {
      }
    } catch (error) {
      res.json({ message: "Error 404" });
    }
  }

  public async updateColection(req: Request, res: Response): Promise<any> {
    try {
      const {
        idEleccion,
        descripcion,
        cargo,
        fechaRegistro,
        estado,
        idAdmin1,
      } = req.body;
      const connectDb = await conexion.connect();

      if (idEleccion) {
        connectDb.query(
          "UPDATE elecciones SET ? WHERE idEleccion = ?",
          [{ descripcion, cargo, fechaRegistro, estado, idAdmin1 }, idEleccion],
          (error, rows) => {
            if (idAdmin1) {
              console.log("Actualizado!");
              console.log(rows);
              return res.json({ message: rows });
            } else {
              console.log(error);
            }
          }
        );
      } else {
        res.json({ message: "error" });
      }
    } catch (error) {
      res.json({ message: "Error 404" });
    }
  }

  public async deleteElection(req: Request, res: Response): Promise<any> {
    try {
      const idEleccion = req.params.idEleccion;
      const connectDb = await conexion.connect();
      connectDb.query(
        "DELETE FROM elecciones WHERE idEleccion = ?",
        [idEleccion],
        (rows, error) => {
          if (!error) {
            return res.json({ message: "eliminado!" });
          } else {
            res.json({ message: error });
          }
        }
      );
    } catch (error) {
      res.json({ message: "Error 404" });
    }
  }
}

export const ControlElections = new controlElections();

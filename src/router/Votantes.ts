import { Router, Request, Response } from "express";
const routerVotante: Router = Router();
import { votantes  } from "../controllers/ControllerVotantes";

routerVotante?.get("/votantesView", votantes .readVotantes)!;
routerVotante?.post("/creatvotantes", votantes .creatVotantes)!;
routerVotante?.put("/updatvotantes/:id", votantes .updateVotantes)!;
routerVotante?.delete("/deletvotantes/:id",votantes .deletVotantes)!;
routerVotante?.get( "/votantesView/:id", votantes.viewsVotantes )!;
routerVotante?.put( "/updatvotantesfine/:id", votantes.updatvotantesfine)!;


export default routerVotante;
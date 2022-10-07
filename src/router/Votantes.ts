import { Router, Request, Response } from "express";
const routerVotante: Router = Router();
import { votantes  } from "../controllers/ControllerVotantes";

routerVotante?.get("/votantesView", votantes .readVotantes)!;
routerVotante?.get("/electvotante/:documento", votantes .electVotante)!;
routerVotante?.post("/creatvotantes", votantes .creatVotantes)!;
routerVotante?.put("/updatvotantes/:id", votantes .updateVotantes)!;
routerVotante?.delete("/deletvotantes/:id",votantes .deletVotantes)!;
routerVotante?.post( "/votantesView", votantes.viewsVotantes )!;
routerVotante?.put( "/updatvotantesfine/:id", votantes.updatvotantesfine)!;


export default routerVotante;
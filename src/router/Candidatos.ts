import { Router, Request, Response } from "express";
const routerCandidato: Router = Router();
import {controllerCandidato } from "../controllers/ContollersCandidato";

routerCandidato?.get("/candidatosViws/:id", controllerCandidato?.candidatosViws)!;
routerCandidato?.post("/postCandidato", controllerCandidato?.postCandidato)!;
routerCandidato?.put("/updateCandidato/:id", controllerCandidato?.updateCandidato)!;
routerCandidato?.delete("/deleteCandidato/:id",controllerCandidato?.deleteCandidato)!;

export default routerCandidato;


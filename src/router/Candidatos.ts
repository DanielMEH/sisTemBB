import { Router, Request, Response } from "express";
import fileUpload from "express-fileupload"
const routerCandidato: Router = Router();
import {controllerCandidato } from "../controllers/ContollersCandidato";
routerCandidato?.get("/candidatosViws/:id", controllerCandidato?.candidatosViws)!;
routerCandidato?.get("/candidatosvista/:id", controllerCandidato?.candidatosvista)!;
routerCandidato?.get("/candidatosvista", controllerCandidato?.candidatosvistaCom)!;
routerCandidato?.post("/postCandidato",fileUpload({
  useTempFiles:true,
  tempFileDir : "./uploads"
}), controllerCandidato?.postCandidato)!;
routerCandidato?.put("/updateCandidato/:id",fileUpload({
  useTempFiles:true,
  tempFileDir : "./uploads"
}), controllerCandidato?.updateCandidato)!;
routerCandidato?.delete("/deleteCandidato/:id",controllerCandidato?.deleteCandidato)!;

export default routerCandidato;


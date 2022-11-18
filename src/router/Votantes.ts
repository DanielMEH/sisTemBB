import { Router, Request, Response } from "express";
const routerVotante: Router = Router();
import { votantes  } from "../controllers/ControllerVotantes";
import fileUpload from "express-fileupload"

routerVotante?.get("/votantesView", votantes .readVotantes)!;
routerVotante?.get("/electvotante/:documento", votantes .electVotante)!;
routerVotante?.post("/creatvotantes", votantes .creatVotantes)!;
routerVotante?.put("/updatvotantes/:id", votantes .updateVotantes)!;
routerVotante?.delete("/deletvotantes/:id",votantes .deletVotantes)!;
 routerVotante?.post( "/votantesView", votantes.viewsVotantes )!;
routerVotante?.get( "/text", votantes.getTitle )!;
routerVotante?.get( "/bestVotos/:id", votantes.bestVotos )!;
routerVotante?.put( "/updatvotantesfine/:idk/:documento1", votantes.updatvotantesfine)!;
routerVotante?.put( "/textUpdate", votantes.textUpdate)!;
routerVotante?.post("/postFileCsv", fileUpload({
    useTempFiles:true,
    tempFileDir : "./uploads"
}),votantes.postFileCsv)!;



export default routerVotante;
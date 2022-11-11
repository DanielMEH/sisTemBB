import { Router, Request, Response } from "express";
const routerElections: Router = Router();
import { ControlElections } from "../controllers/ControllerElections";

routerElections?.get("/electionsView", ControlElections.readElections)!;
routerElections?.get("/viewsElections/:id", ControlElections.electionId)!;
routerElections?.put("/updateElection/:id", ControlElections.updateColection)!;
routerElections?.delete("/deleteElection/:idEleccion",ControlElections.deleteElection)!;


export default routerElections;

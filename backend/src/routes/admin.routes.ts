import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware";
import { approveEvent, getAllEvents, rejectEvent } from "../controllers/admin.controller";


export const adminRouter = Router();

adminRouter.use(protect, authorize("admin"));

//lay toan bo event o pending
adminRouter.get("/pending-events", getAllEvents);//xong

//duyet hoac tu choi event
adminRouter.put("/approve-event/:id", approveEvent);//xong

adminRouter.put("/reject-event/:id",rejectEvent);//xong
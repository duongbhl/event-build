import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createEvent,
  getAllEvent,
  getAllPendingEvent,
  getAllApprovalEvent,
  bookTicket,
  cancelTicket,
  getTicketById,
  getEvents,
} from "../controllers/user.controller";

export const userRouter = Router();

/* ===============================
      📦 EVENT ROUTES (USER)
   =============================== */

// 👉 Tạo mới sự kiện (chờ admin duyệt)
userRouter.post("/event", protect, createEvent);//xong

// 👉 Xem tất cả sự kiện do user hiện tại tổ chức
userRouter.get("/events", protect, getAllEvent);//xong

// 👉 Xem danh sách sự kiện chưa được duyệt (chỉ organizer thấy)
userRouter.get("/events/pending", getAllPendingEvent);//xong

// 👉 Xem danh sách sự kiện đã được duyệt (tất cả user đều thấy)
userRouter.get("/events/approved", getAllApprovalEvent);//xong

//su kien cua ng khac da dc approved
userRouter.get("/allEvents/approved",protect,getEvents);

/* ===============================
      🎟️ TICKET ROUTES (USER)
   =============================== */

// 👉 Đặt vé cho 1 sự kiện
userRouter.post("/tickets", protect, bookTicket);//xong

// 👉 Hủy vé đã đặt
userRouter.put("/tickets/:id/cancel", protect, cancelTicket);//xong

// Xem chi tiết vé theo ID
userRouter.get("/tickets/:id", protect, getTicketById);//xong


export default userRouter;

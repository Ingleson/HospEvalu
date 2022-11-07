import { Router } from "express";
import createScheduleController from "../Controllers/schedules/createSchedule.controller";
import deleteScheduleController from "../Controllers/schedules/deleteSchedule.controller";
import getAllSchedulesController from "../Controllers/schedules/getAllSchedules.controller";
import getSchedulesByUserController from "../Controllers/schedules/getSchedulesByUser.controller";
import updateScheduleController from "../Controllers/schedules/updateSchedule.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";

export const scheduleRoutes = Router()

scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController)
scheduleRoutes.get("", ensureAuthMiddleware, getAllSchedulesController)
scheduleRoutes.get("user/:userId", ensureAuthMiddleware, getSchedulesByUserController)
scheduleRoutes.get("profissional/:professionalId", ensureAuthMiddleware, getSchedulesByUserController)
scheduleRoutes.patch(":id", ensureAuthMiddleware, updateScheduleController)
scheduleRoutes.delete(":id", ensureAuthMiddleware, deleteScheduleController)
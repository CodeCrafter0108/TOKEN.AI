import { AppRoutes } from "@/constants/routes";

export const supportedPages: string[] = Object.values(AppRoutes).filter((route) => route !== AppRoutes.LAUNCHER);

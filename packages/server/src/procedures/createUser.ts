import { publicProcedure } from "../createContext.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export const createUserProcedure = publicProcedure.input(
  z.object({
    email: z.string(),
  })
);

import { router } from "../createContext.js";
import { z } from "zod";

import { userRouter } from "./user.router.js";

export const appRouter = router({
  user: userRouter, // put procedures under "user" namespace
});

export type AppRouter = typeof appRouter;

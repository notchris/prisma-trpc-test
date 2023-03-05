import { router, publicProcedure } from "../createContext.js";
import { z } from "zod";
export const userRouter = router({
  list: publicProcedure.query(() => {
    // [..]
    return [];
  }),
});

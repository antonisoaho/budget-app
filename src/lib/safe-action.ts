import { getCurrentUser } from "@/services/auth.services";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";

class MyCustomError extends Error {}

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof MyCustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();
  const result = await next();

  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");

  return result;
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { user } });
});

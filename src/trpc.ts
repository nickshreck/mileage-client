import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "../../server/functions/api"

export const trpc = createReactQueryHooks<AppRouter>();
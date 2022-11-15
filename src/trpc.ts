import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "../../api-server/functions/api"

export const trpc = createReactQueryHooks<AppRouter>();
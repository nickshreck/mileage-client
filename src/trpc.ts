import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "mileage-api-server"

export const trpc = createReactQueryHooks<AppRouter>();

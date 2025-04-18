import { createFileRoute } from '@tanstack/react-router'
import {createServerFn} from "@tanstack/react-start";
import z from 'zod'
import prisma from "~/utils/db";

export const Route = createFileRoute('/__public/login')({
  component: RouteComponent,
})

{/* staviti u poseban file u /utils*/}
const UserRole = ['admin', 'user'] as const;
const RegisterUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  emailVerified: z.boolean().default(false),
  role: z.enum(UserRole).default('user')
})

const register =
    createServerFn({method: 'POST'})
    .validator(RegisterUserSchema)
    .handler( async ({data}) => {

    })

function RouteComponent() {

  return <div></div>
}

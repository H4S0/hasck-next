import { createFileRoute } from '@tanstack/react-router'
import {createServerFn} from "@tanstack/react-start";
import z from 'zod'
import prisma from "~/utils/db";
import {RegisterUserSchema} from "~/utils/zodSchemas";

export const Route = createFileRoute('/__public/login')({
  component: RouteComponent,
})

const register =
    createServerFn({method: 'POST'})
    .validator(RegisterUserSchema)
    .handler( async ({data}) => {
        const user = await prisma.user.findUnique({
          where: {
              email: data.email,
          }
        })

        if(user) {
            return {
            /*napraviti error response(data? i error) i success response(data? i message)*/
            }
        }
    })

function RouteComponent() {

  return <div></div>
}

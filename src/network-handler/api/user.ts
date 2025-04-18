import { z } from "zod";
import {
  BaseErrorResponse,
  beFetch,
  FormErrorResponse,
  MessageSuccessResponse,
  SuccessResponse,
} from ".";
import { StatusCodes } from "http-status-codes";

export const UserRegisterSchema = z
  .object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Confirm password does not match provided password",
    path: ["confirmPassword"],
  });

export const UserRoleEnum = ["admin", "user"] as const;

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(UserRoleEnum),
});

export const UserLoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string(),
});

export function login(data: z.infer<typeof UserLoginSchema>) {
  return beFetch.json(
    "/api/v1/auth/login",
    {
      [StatusCodes.INTERNAL_SERVER_ERROR]: BaseErrorResponse,
      [StatusCodes.NOT_FOUND]: BaseErrorResponse,
      [StatusCodes.UNAUTHORIZED]: BaseErrorResponse,
      [StatusCodes.BAD_REQUEST]: FormErrorResponse,
      [StatusCodes.OK]: MessageSuccessResponse(),
    },
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export function register(data: z.infer<typeof UserRegisterSchema>) {
  return beFetch.json(
    "/api/v1/auth/register",
    {
      [StatusCodes.INTERNAL_SERVER_ERROR]: BaseErrorResponse,
      [StatusCodes.BAD_REQUEST]: BaseErrorResponse.or(FormErrorResponse),
      [StatusCodes.OK]: SuccessResponse(UserSchema),
    },
    { body: JSON.stringify(data) },
  );
}

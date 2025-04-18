import { z, ZodType } from "zod";
import { safeFetch } from "../safe-fetch";

export * as user from "./user";

export const MessageSuccessResponse = () =>
  z.object({
    data: z.null(),
    message: z.string(),
  });

export const DataSuccessResponse = <T extends ZodType<any>>(data: T) =>
  z.object({
    data,
    message: z.null(),
  });

export const SuccessResponse = <T extends ZodType<any>>(data: T) =>
  z.object({
    data,
    message: z.string(),
  });

const BaseErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
});

const FormErrorsSchema = z.record(z.array(z.string()));

export const FormErrorResponse = z.object({
  type: z.literal("error"),
  errorKind: z.literal("form"),
  message: z.string(),
  errors: FormErrorsSchema,
});

export const BaseErrorResponse = z.object({
  type: z.literal("error"),
  errorKind: z.literal("base"),
  message: z.string(),
  errors: BaseErrorSchema.nullable(),
});

export const beFetch = safeFetch.create({ baseUrl: "http://localhost:4000" });

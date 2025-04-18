import { z, ZodTypeAny } from "zod";
import { Result, err, ok, ResultAsync } from "neverthrow";

type SchemaMap = Record<number, ZodTypeAny>;

type InferredResponse<T extends SchemaMap> = {
  [K in keyof T]: {
    status: K;
    response: Response;
    result: T[K] extends ZodTypeAny ? z.infer<T[K]> : never;
  };
}[keyof T];

export type SafeFetchError =
  | {
      type: "NETWORK_ERROR";
      message: string;
    }
  | {
      type: "NON_JSON_RESPONSE";
      message: string;
    }
  | {
      type: "PARSING_ERROR";
      message: string;
    }
  | {
      type: "NO_MATCHING_SCHEMA";
      message: string;
    }
  | {
      type: "VALIDATION_ERROR";
      message: string;
    };

export interface SafeFetchConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
}

export interface SafeFetchInstance {
  setDefaultHeaders(headers: HeadersInit): void;
  json<T extends SchemaMap>(
    input: RequestInfo,
    schemas: T,
    init?: RequestInit,
  ): Promise<Result<InferredResponse<T>, SafeFetchError>>;
}

function mergeHeaders(mergeTo?: HeadersInit, merge?: HeadersInit) {
  const headers = new Headers(mergeTo);
  if (merge) {
    const initHeaders = new Headers(merge);
    initHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return headers;
}
/**
 * safeFetch is an object that exposes a factory method to create instances
 * of safe fetch functions. Each instance is configured with static parameters
 * (e.g., baseUrl, default headers) and returns a safeFetch method to perform
 * HTTP requests using neverthrow for error handling.
 */
export const safeFetch = {
  /**
   * Creates a new instance of safe fetch with the provided static configuration.
   * @param config - Static parameters including baseUrl and optional default headers.
   * @returns A SafeFetchInstance with the safeFetch method.
   */
  create(config: SafeFetchConfig): SafeFetchInstance {
    return {
      setDefaultHeaders(headers: HeadersInit) {
        config.defaultHeaders = mergeHeaders(config.defaultHeaders, headers);
      },
      async json<T extends SchemaMap>(
        input: RequestInfo,
        schemas: T,
        init?: RequestInit,
      ): Promise<Result<InferredResponse<T>, SafeFetchError>> {
        const headers = mergeHeaders(config.defaultHeaders, init?.headers);
        headers.set("Content-Type", "application/json");

        const finalInit = { ...init, headers };

        // Execute the fetch request, wrapping any network error.
        const fetchResult = await ResultAsync.fromPromise(
          fetch(config.baseUrl + input, finalInit),
          (e) =>
            ({
              type: "NETWORK_ERROR",
              message: (e as Error).message,
            }) as const,
        );
        if (fetchResult.isErr()) {
          return err(fetchResult.error);
        }
        const response = fetchResult.value;

        const contentType = response.headers.get("Content-Type") ?? "";
        if (!contentType.includes("application/json")) {
          return err({
            type: "NON_JSON_RESPONSE",
            message: "Response is not of type application/json",
          });
        }

        const jsonResult = await ResultAsync.fromPromise(
          response.json(),
          () => ({
            type: "PARSING_ERROR" as const,
            message: "Failed to parse JSON response",
          }),
        );
        if (jsonResult.isErr()) {
          return err(jsonResult.error);
        }
        const json = jsonResult.value;

        const schema = schemas[response.status];
        if (!schema) {
          return err({
            type: "NO_MATCHING_SCHEMA",
            message: `No matching schema for status ${response.status}`,
          });
        }

        const validationResult = schema.safeParse(json);
        if (!validationResult.success) {
          return err({
            type: "VALIDATION_ERROR",
            message: validationResult.error.toString(),
          });
        }

        return ok({
          status: response.status,
          response,
          result: validationResult.data,
        } as InferredResponse<T>);
      },
    };
  },
};

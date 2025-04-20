// lib/validate.ts
import { ZodSchema, ZodError } from 'zod';
import { NextRequest } from 'next/server';

export async function validateRequest<T>(
    req: NextRequest,
    schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
    try {
        const body = await req.json();
        const parsed = schema.parse(body);
        return { success: true, data: parsed };
    } catch (err) {
        if (err instanceof ZodError) {
            return {
                success: false,
                error: JSON.stringify(
                    err.errors.map((e) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                )
            };
        }

        return {
            success: false,
            error: 'Invalid request',
        };
    }
}

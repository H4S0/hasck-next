import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {User} from "@/app/models/User";

interface SessionResult {
    user:  | null;
    authenticated: boolean;
    error?: string;
}
export const useHasckServerSession = async (): Promise<SessionResult> => {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return { user: null, authenticated: false, error: "Token not found" };
        }

        //ovaj decode i parse staviti u jednu funckiju jer se ponavlja na više mjesta
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const parsed = typeof decoded === "string" ? JSON.parse(decoded) : decoded;

        const user = await User.findById(parsed.id);

        if (!user) {
            return { user: null, authenticated: false, error: "User not found" };
        }

        return { user, authenticated: true };
    } catch (err) {
        console.error("Auth error:", err);
        return { user: null, authenticated: false, error: "Invalid or expired token" };
    }
};
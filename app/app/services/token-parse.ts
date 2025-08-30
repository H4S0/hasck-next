import jwt from 'jsonwebtoken'

export function tokenParsing(token: string){
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    const parsed = typeof decode === 'string' ? JSON.parse(decode) : decode;

    return parsed;
}
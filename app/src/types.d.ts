declare namespace Express {
    export interface Request {
        userId?: string;
        idapp?: string;        
        cargo?: string;
        niv?: number;
    }
}
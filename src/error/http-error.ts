export class HttpError extends Error {
    public static readonly type = 'HttpError';

    constructor(public code: string, public status: number, public type: string = HttpError.type) {
        super(code);
    }
}
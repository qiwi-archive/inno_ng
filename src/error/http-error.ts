export class HttpError extends Error {
    public static CODE_ERROR_CONNECT = 'ERROR_CONNECT';
    constructor(public code: string = HttpError.CODE_ERROR_CONNECT) {
        super(code);
    }
}
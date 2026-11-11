// extends - יורש
export class AppError extends Error {
    constructor(message = '', type = 'Server Error', status = 500) {
        super(message);
        this.type = type;
        this.status = status;
    }
}
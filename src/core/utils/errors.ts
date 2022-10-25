export class BaseError extends Error {
    public name!: string;
}


export class NotFoundError extends BaseError {}


export class ValidationError extends BaseError {}
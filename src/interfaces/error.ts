interface ErrorDetail {
    type: string;
    message: string;
}
  
export interface IError {
    status: number;
    errors: ErrorDetail[];
}
  
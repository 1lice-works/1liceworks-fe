export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message?: string;
  data?: T;
  result?: boolean | null | undefined;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  status: number;
  errorDetails: ErrorDetails;
}

export interface ErrorDetails {
  errorName: string;
  errors: ValidationError[];
  errorUri: string;
  httpMethod: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

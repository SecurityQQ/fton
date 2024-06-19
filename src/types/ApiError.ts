// types/ApiError.ts
export interface ApiError extends Error {
  response?: {
    status: number;
    data?: any;
  };
}

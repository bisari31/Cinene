interface ICustomResponse {
  success: boolean;
  message?: string;
}

interface IAxiosError<T = unknown> extends Error {
  response: {
    data: ICustomResponse & T;
    status: number;
  };
}

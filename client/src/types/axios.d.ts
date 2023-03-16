interface DefaultData {
  success: boolean;
  message?: string;
}

type CustomResponse<T = unknown> = DefaultData & T;

interface AxiosError<T = unknown> extends Error {
  response: {
    data: ICustomResponse & T;
    status: number;
  };
}

interface DefaultData {
  success: boolean;
  message?: string;
  accessToken?: string;
}

type CustomResponse<T = unknown> = DefaultData & T;

interface AxiosError<T = unknown> extends Error {
  response: {
    data: CustomResponse & T;
    status: number;
  };
}

interface IUser {
  createdAt: string;
  email: string;
  img: string;
  nickname: string;
  password: string;
  token: string;
  updatedAt: string;
  __v: number;
  _id: string;
  active: boolean;
}

interface ILoginError {
  response: {
    data: {
      success: boolean;
      message: string;
    };
  };
}

interface IAuthData {
  success: boolean;
  user?: IUser;
}

interface IObject {
  value: string;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLInputElement>;
}

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

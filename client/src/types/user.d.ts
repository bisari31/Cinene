interface IUser {
  _id: string;
  email: string;
  nickname: string;
  password: string;
  token: string;
  createdAt: string;
  img: string;
}

interface ILoginError {
  response: {
    data: {
      success: boolean;
      message: string;
      type: 'email' | 'password' | 'nickname';
    };
  };
}

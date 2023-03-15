interface IUser {
  createdAt: string;
  email: string;
  img: string;
  nickname: string;
  refresh_token: string;
  updatedAt: Date;
  __v: number;
  _id: string;
  active: boolean;
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

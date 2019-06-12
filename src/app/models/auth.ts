export interface Singup {
  message: string;
  body: User;
}

export interface User {
  age: number;
  email: string;
  imagePath: string;
  name: string;
  nickName: string;
  surname: string;
  weight: number;
  height: number;
  userId: string;
}

export interface Login {
  expiresIn: number;
  loginedUser: User;
  token: string;
}

export interface ProfileContent {
  message: string;
  body: User;
}

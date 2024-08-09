export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  role: string;
  password: any;
  phone: string;
  name: string;
  city: string;
  country: string;
}


export interface UserEdit {
  id: number;
  email: string;
  role: string;
  password: any;
  phone: string;
  name: string;
  city: string;
  country: string;
  generalInfo: string;
}

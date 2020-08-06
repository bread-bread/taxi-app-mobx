export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegistrationForm = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export type TCard = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvc: string;
  token: string;
};

export type TRoute = {
  from: string;
  to: string;
}

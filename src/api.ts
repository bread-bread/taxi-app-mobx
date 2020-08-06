import { TRegistrationForm, TLoginForm, TCard } from "./store/Types";

const rootUrl = 'https://loft-taxi.glitch.me';

const options = (body: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body
});
 
const login = (form: TLoginForm) => {
  const { email, password } = form;
  const body = JSON.stringify({ email, password });

  return fetch(
    `${rootUrl}/auth`,
    options(body)
  ).then(res => res.json());
};

const register = (form: TRegistrationForm) => {
  const { email, password, name, surname } = form;
  const body = JSON.stringify({ email, password, name, surname });

	return fetch(
		`${rootUrl}/register`,
		options(body)
	).then(res => res.json());
};

const addCard = (form: TCard) => {
  const { cardNumber, cardName, expiryDate, cvc, token } = form;
  const body = JSON.stringify({ cardNumber, expiryDate, cardName, cvc, token });

	return fetch(
		`${rootUrl}/card`,
		options(body)
	).then(res => res.json());
};

const getCard = (token: string) => {
	return fetch(
		`${rootUrl}/card?token=${token}`
	).then(res => res.json());
};

const getAddresses = () => {
	return fetch(
		`${rootUrl}/addressList`
	).then(res => res.json());
};

const getRoute = (startRoute: string, endRoute: string) => {
	return fetch(
		`${rootUrl}/route?address1=${startRoute}&address2=${endRoute}`
	).then(res => res.json());
};

export {
  login,
  register,
  addCard,
  getCard,
  getRoute,
  getAddresses
};

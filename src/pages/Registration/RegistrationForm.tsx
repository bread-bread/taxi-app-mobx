import React, { useState } from "react";
import { useFormStyles } from "../../shared/styles";
import {
	Paper,
	Container,
	Typography,
	Grid,
	TextField,
	Box,
	Button
} from "@material-ui/core/";

import { Link, Redirect } from "react-router-dom";
import { useStore } from "../../store/StoreProvider";
import { TRegistrationForm } from "../../store/Types";
import { observer } from "mobx-react";

const RegistrationForm = props => {
  const store = useStore();
	const [userInfo, setUserInfo] = useState<TRegistrationForm>({
		email: "",
		password: "",
		name: "",
		surname: ""
	});
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		store.registration(userInfo);
	};

	const onInputChange = event => {
		let input = event.target;
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	const classes = useFormStyles();

	if (store.isLoggedIn) {
		return <Redirect to="/map" />;
	}

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<Typography variant="h4" component="h1">
					Регистрация
				</Typography>
				<div>
					<p>
						Уже зарегистрирован?{" "}
						<Link to="/login">
							Войти
						</Link>
					</p>
				</div>
				<form onSubmit={onSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Адрес электронной почты"
								type="email"
								name="email"
								value={userInfo.email}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputEmail" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Имя"
								type="text"
								name="name"
								value={userInfo.name}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputName" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Фамилия"
								type="text"
								name="surname"
								value={userInfo.surname}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputSurname" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Пароль"
								type="password"
								name="password"
								value={userInfo.password}
								onChange={onInputChange}
								inputProps={{ "data-testid": "inputPassword" }}
								margin="normal"
								fullWidth
								required
							/>
						</Grid>
					</Grid>
					<Box className={classes.buttonContainer}>
						<Button type="submit" variant="contained" color="primary">
							Зарегистрироваться
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
};

export default observer(RegistrationForm);

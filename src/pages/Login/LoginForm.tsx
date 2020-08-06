import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useFormStyles } from "../../shared/styles";
import {
	Container,
	Paper,
	Typography,
	TextField,
	Box,
	Button
} from "@material-ui/core";
import { useStore } from "../../store/StoreProvider";
import { observer } from "mobx-react";

const LoginForm: React.FC = () => {
  const store = useStore(); 
	const [userInfo, setUserInfo] = React.useState({
		email: "",
		password: ""
	});
  const classes = useFormStyles();
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		store.login(userInfo);
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
  
		setUserInfo({ ...userInfo, [input.name]: input.value });
	};

	if (store.isLoggedIn) {
		return <Redirect to="/map" />;
	}

	return (
		<Paper className={classes.form}>
			<Container className={classes.formContainer}>
				<Typography variant="h4" component="h1">
					Войти
				</Typography>
				<div>
					<p>
						Новый пользователь?{" "}
						<Link to="/registration">
							Зарегистрируйтесь
						</Link>
					</p>
				</div>
				<form onSubmit={onSubmit}>
					<TextField
						label="Имя пользователя"
						type="email"
						name="email"
						value={userInfo.email}
						onChange={onInputChange}
						inputProps={{ "data-testid": "inputName" }}
						margin="normal"
						fullWidth
						required
					/>
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
					<Box className={classes.buttonContainer}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							data-testid="buttonLogin"
						>
							Войти
						</Button>
					</Box>
				</form>
			</Container>
		</Paper>
	);
};

export default observer(LoginForm);

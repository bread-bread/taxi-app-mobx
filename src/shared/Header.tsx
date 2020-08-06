import React from "react";
import { Logo } from "loft-taxi-mui-theme";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core/";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreProvider";

const useStyles = makeStyles(() => ({
	bar: {
		backgroundColor: "#fff"
	},
	title: {
		flexGrow: 1
	}
}));

const Header = () => {
	const classes = useStyles();
  const { logout } = useStore();

	return (
		<AppBar position="static" className={classes.bar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<Logo />
				</Typography>
				<Button component={Link} to="/map" color="inherit">
					Карта
				</Button>
				<Button component={Link} to="/profile" color="inherit">
					Профиль
				</Button>
				<Button onClick={logout} color="inherit">
					Выйти
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

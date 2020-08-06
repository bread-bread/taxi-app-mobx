import * as React from "react";

import Background from '../assets/images/auth-bg.jpg';
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "loft-taxi-mui-theme";
import { Container, Box } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
	authBg: {
		backgroundColor: "#000",
		backgroundImage: `url(${Background})`,
		backgroundSize: "cover"
	},
	container: {
		maxWidth: "1000px",
		minHeight: "100vh",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	logoContainer: {
		width: "420px",
		display: "flex",
		justifyContent: "center"
	}
}));

const AuthWrapper: React.FC = ({ children }) => {
	const classes = useStyles();
	return (
		<div className={classes.authBg}>
			<Container>
				<Box className={classes.container}>
					<Box className={classes.logoContainer}>
						<Logo white animated />
					</Box>
					{children}
				</Box>
			</Container>
		</div>
	);
};

export default AuthWrapper;

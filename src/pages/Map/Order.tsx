import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Box, Typography, Button } from "@material-ui/core/";

import OrderForm from "./OrderForm";
import { useStore } from "../../store/StoreProvider";
import { observer } from "mobx-react";

const NavLink = React.forwardRef<HTMLAnchorElement>((props, ref) => (
	<RouterLink to='/profile' innerRef={ref} {...props} />
));

const useFormStyles = makeStyles(() => ({
	container: {
    padding: "24px",
    position: 'absolute'
	},
	order: {
		padding: "40px 0",
		width: "500px"
	},
	orderContainer: {
		padding: "0 50px"
	},
	message: {
		textAlign: "center"
	},
	button: {
		marginTop: "30px"
	}
}));

const Order = () => {
  const { card, coordinates, resetCoordinates } = useStore();
  const classes = useFormStyles();

	return (
		<Container className={classes.container}>
			<Paper className={classes.order}>
				<Container className={classes.orderContainer}>
          {
            !card &&
            <Box className={classes.message}>
              <Typography variant="body1">
                Заполните данные банковской карты
              </Typography>
              <Button
                className={classes.button}
                component={NavLink}
                variant="contained"
                color="primary"
                size="large"
              >
                Перейти в Профиль
              </Button>
            </Box>
          }
          {
            !!coordinates.length &&
            <Box className={classes.message}>
              <Typography variant="body1">
                 Ваш заказ принят. Такси скоро приедет.
              </Typography>
              <Button
                onClick={resetCoordinates}
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
              >
                Сделать новый заказ
              </Button>
            </Box>
          }
          {
            card && !coordinates.length && <OrderForm />
          }
				</Container>
			</Paper>
		</Container>
	);
};

export default observer(Order);

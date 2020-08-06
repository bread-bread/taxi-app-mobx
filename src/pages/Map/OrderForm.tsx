import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
	Box,
	MenuItem,
	Select,
	Button,
	FormControl,
	InputLabel
} from "@material-ui/core/";
import { useStore } from '../../store/StoreProvider';
import { TRoute } from '../../store/Types';

const useFormStyles = makeStyles(() => ({
	formControl: {
		minWidth: "100%"
	},
	buttonContainer: {
		marginTop: "30px"
	}
}));

const OrderForm = () => {
  const { getCoordinates, addresses } = useStore();
	const [route, setRoute] = React.useState<TRoute>({
		from: "",
		to: ""
  });

	const classes = useFormStyles();

	const onChange = event => {
		let input = event.target;
		setRoute({ ...route, [input.name]: input.value });
	};

	const onSubmit = event => {
		event.preventDefault();
		getCoordinates(route);
  };

	return (
		<form onSubmit={onSubmit}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="from">Откуда</InputLabel>
        <AddressSelect
          addressKey="from"
          otherAddress={route.to}
          onChange={onChange}
          route={route}
          values={addresses}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="to">Куда</InputLabel>
        <AddressSelect
          addressKey="to"
          otherAddress={route.from}
          onChange={onChange}
          route={route}
          values={addresses}
        />
      </FormControl>
			<Box className={classes.buttonContainer}>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					data-testid="buttonLogin"
					fullWidth
					size="large"
				>
					Вызвать такси
				</Button>
			</Box>
		</form>
	);
}

type SelectProps = {
  addressKey: string;
  otherAddress: string;
  values: string[];
  onChange(e: React.ChangeEvent<{ name?: string; value: unknown; }>): void;
  route: TRoute;
}

function AddressSelect(props: SelectProps) {
  const { addressKey, otherAddress, values, onChange, route } = props;
  const availableAddresses = values
    .filter(item => item !== otherAddress)
    .map(addressItem => (
      <MenuItem key={addressItem} value={addressItem}>
        {addressItem}
      </MenuItem>
    ));

  return (
    <Select
      value={route[addressKey]}
      onChange={onChange}
      inputProps={{ name: addressKey, id: addressKey }}
      data-testid={addressKey}
      autoWidth
    >
      {availableAddresses}
    </Select>
  );
};

export default OrderForm;

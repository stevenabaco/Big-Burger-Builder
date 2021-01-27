import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Lettuce", type: "lettuce" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			<strong>Current Price: $ {props.price.toFixed(2)}</strong>
		</p>
		<div className={classes.BuildControlContainer}>{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
				
			/>
		))}
		</div>
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}
		>
			{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
		</button>
	</div>
);

export default BuildControls;

import React from "react";
import classes from "./Input.module.css";

const input = props => {
	let inputElement = null;
	switch (props.inputtype) {
		case "input":
			inputElement = (
				<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		default:
			inputElement = (
				<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
	}
	return (
		<div className={classes.input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;

import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>
			BURGER BUILDER
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link="/orders">ORDERS</NavigationItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavigationItem link="/auth">LOGIN</NavigationItem>
		) : (
			<NavigationItem link="/logout">LOGOUT</NavigationItem>
		)}
	</ul>
);

export default navigationItems;

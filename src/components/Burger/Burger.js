import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
    const transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        console.log([...Array(props.ingredients[ingKey])].map(( _, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
            
    })) 
        })
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			<BurgerIngredient type='lettuce' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default burger;

import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.7,
	meat: 1.5,
	bacon: 1.25,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
	};

	removeIngredientHandler = type => {};

	render() {
		return (
			<>
				<div>
					<Burger ingredients={this.state.ingredients} />
				</div>
				<div>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}/>
				</div>
			</>
		);
	}
}

export default BurgerBuilder;

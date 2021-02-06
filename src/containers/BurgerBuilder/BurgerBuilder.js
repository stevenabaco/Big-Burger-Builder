import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const BurgerBuilder = props => {
	
	const [purchasing, setPurchasing] = useState(false)
	
	const {onInitIngredients} = props
	
	useEffect(() => {
		onInitIngredients();
	},[onInitIngredients])

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push("/auth");
		};
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey];
			})
			.reduce((sum, el) => {
				// console.log("sum", sum);
				// console.log("curValue", el);
				return sum + el;
			}, 0);
		return sum > 0;
	}

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push("/checkout");
	};


		const disabledInfo = {
			...props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		} // {lettuce: true, meat: false}

		let orderSummary = null;
		let burger = props.error ? (
			<p>Ingredients can't be loaded from server!</p>
		) : (
			<Spinner />
		);

		if (props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={props.ings} />
					<BuildControls
						ingredientAdded={props.onIngredientAdded}
						ingredientRemoved={props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={updatePurchaseState(props.ings)}
						isAuth={props.isAuthenticated}
						ordered={purchaseHandler}
						price={props.price}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={props.ings}
					price={props.price}
					purchaseCancelled={purchaseCancelHandler}
					purchaseContinued={purchaseContinueHandler}
				/>
			);
		}

		return (
			<React.Fragment>
				<Modal
					show={purchasing}
					modalClosed={purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}


const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withErrorHandler(BurgerBuilder, axios),
	axios
);

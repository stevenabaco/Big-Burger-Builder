import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
	}
	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	updatePurchaseState(ingredients) {
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

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		} // {lettuce: true, meat: false}

		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded from server!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}

		return (
			<React.Fragment>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withErrorHandler(BurgerBuilder),
	axios
);

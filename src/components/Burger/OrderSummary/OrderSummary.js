import React, {Component} from "react";
import Button from '../../UI/Button/Button'


class orderSummary extends Component {
	// This could be a functional component, doesn't have to be a class.
	componentDidUpdate() {
		console.log('[OrderSummary] DidUpdate')
	}
	
	render() {

		const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
		return (
			<li key={ingKey}>
				<span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
				{this.props.ingredients[ingKey]}
			</li>
		);
	});
		return (
		<>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued }>CONTINUE</Button>
		</>
	);
	}	
};

export default orderSummary;

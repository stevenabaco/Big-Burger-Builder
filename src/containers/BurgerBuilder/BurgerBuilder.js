import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

	render() {
		return (
			<>
                <div><Burger
                    ingredients={this.state.ingredients} /></div>
				<div>Build Controls</div>
			</>
		);
	}
}

export default BurgerBuilder;

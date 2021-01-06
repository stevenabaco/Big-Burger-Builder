import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 3,
            meat: 2
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

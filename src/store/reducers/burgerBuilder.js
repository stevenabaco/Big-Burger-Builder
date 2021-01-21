import * as actions from "../actions/actionTypes";

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	cheese: 0.7,
	meat: 1.5,
	bacon: 1.25,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actions.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
			};
		default:
			return state;
	}
};

export default reducer;

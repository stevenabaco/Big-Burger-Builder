import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			city: "",
			state: "",
			zip: "",
        },
        loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		// console.log(this.props.ingredients);
		// alert("You Continue!");
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Wizard",
				address: {
					street: "Test Street 1234",
					zipCode: "67890",
					country: "Mars",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/')
            })
            .catch(error => {
            this.setState({ loading: false });
            })

	};

    render() {
        
        let form = (
					<form>
						<input
							className={classes.Input}
							type='text'
							name='name'
							placeholder='Your Name'
						/>
						<input
							className={classes.Input}
							type='email'
							name='email'
							placeholder='Your Email'
						/>
						<input
							className={classes.Input}
							type='text'
							name='street'
							placeholder='Address'
						/>
						<input
							className={classes.Input}
							type='text'
							name='city'
							placeholder='City'
						/>
						<input
							className={classes.Input}
							type='text'
							name='state'
							placeholder='State'
						/>
						<input
							className={classes.Input}
							type='text'
							name='zip'
							placeholder='Zip Code'
						/>
						<Button btnType='Success' clicked={this.orderHandler}>
							ORDER
						</Button>
					</form>
				);
        if (this.state.loading) {
            form = <Spinner/>
        }
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact information</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;

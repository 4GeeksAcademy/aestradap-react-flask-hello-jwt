import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleLogin = async() => {
		const response = await actions.logIn({
			email: email, 
			password: password
		});
		if(response)
		 Navigate("/profile");
		alert("Somenthing wrong whit the login");
	}

	return <>
	<div className="container mt-5">
		<div className="row">
			<div className="col"/>
			<div className="col">
				<form>
					<div className="mb-3">
						<label for="exampleInputEmail1"
							className="form-label">
								Email address
						</label>
						<input type="email"
						className="form-control"
						id="exampleInputEmail1" 
						aria-describedby="emailHelp"
						value={ email }
						onChange={ event => setEmail(event.target.value) }
						/>
					</div>
					<div className="mb-3">
						<label for="exampleInputPassword1" 
							className="form-label">
								Password
						</label>
						<input type="password"
						className="form-control"
						id="exampleInputPassword1"
						value={ password }
						onChange={ event => setPassword(event.target.value) }
						/>
					</div>
			
					<button type="submit" 
						className="btn btn-primary"
						onClick={ handleLogin }
					>Submit
					</button>
				</form>
			</div>
			<div className="col" />
		</div>
	</div>
	</>	
};
  
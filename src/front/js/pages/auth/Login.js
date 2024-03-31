import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [ show, setShow ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleLogin = async(event) => {
		event. preventDefault();
		setShow(false);
		const response = await actions.logIn({
			email: email, 
			password: password
		});

		if(response === true){
			navigate("/private");
		}
		else{
		 setShow(true);
		} 
	}

	return <>
	<div className="container mt-5">
	{show && 
		<div className="alert alert-danger d-flex justify-content-center align-items-center" role="alert">
			<div >
				Somenthing wrong with the login, please try again.
			</div>
	  	</div>
	}
		<div className="row">
			<div className="col"/>
			<div className="col">
				<form>
					<h2>LOGIN SCREEN</h2>
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
						onClick={ event => handleLogin(event) }
					>Submit
					</button>
				</form>
			</div>
			<div className="col" />
		</div>
	</div>
	</>	
};
  
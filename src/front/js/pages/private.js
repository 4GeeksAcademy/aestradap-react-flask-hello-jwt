import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(()=>{
		if( store.localStorageCheck && !store.token){
			navigate("/login");
		}
	},[store.token, navigate])

	return (
		<div className="text-center mt-5">
			<h1>ONLY FOR AUTHENTICATED USERS</h1>
			<button className="btn btn-primary me-2"
			        onClick={ event => actions.fecthPrivateEndPoint() }
			>
					fecthPrivateEndPoint
			</button>
			<p>{store.privateData}</p>
		</div>
	);
};
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React + Flask + JWT</span>
				</Link>
				
				<div className="ml-auto">
					{store.localStorageCheck && !store.token
						?<>
							<Link to="/login">
								<button className="btn btn-primary me-2">
									Login
								</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary me-2">
									Signup
								</button>
							</Link>
						</>
						:<button className="btn btn-primary me-2"
									onClick={(event)=>{actions.logUserOut()}}
							>
								Logout
						</button>
					}
				</div>
			</div>
		</nav>
	);
};

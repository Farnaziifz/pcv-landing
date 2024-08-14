import { Navigate } from "react-router-dom";
import Login from "../../views/Login/Login";
const routes = [
	{
		path: "/",
		element: <Navigate to="/Login" replace />,
	},
	{
		path: "Login",
		element: <Login />,
	},
];

export default routes;

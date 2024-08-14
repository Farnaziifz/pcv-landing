import { Navigate } from "react-router-dom";
import Login from "../../views/Login/Login";
import Form from "../../views/Forms/Forms";

const routes = [
	{
		path: "/",
		element: <Navigate to="/Login" replace />,
	},
	{
		path: "Login",
		element: <Login />,
	},
	{
		path: "forms/:formType",
		element: <Form />,
	},
];

export default routes;

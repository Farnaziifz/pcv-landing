import { Navigate } from "react-router-dom";
import Login from "../../views/Login/Login";
import Form from "../../views/Forms/Forms";
import FinishedPgae from "../../views/FinishedPage";

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
	{
		path: "finished",
		element: <FinishedPgae />,
	},
];

export default routes;

import logo from "./assets/image/orchid-logo-light.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { router } from "./resources/router/index";
function App() {
	return (
		<div className="min-h-screen bg-primary flex flex-col items-center px-3 lg:px-10 pb-10">
			<header className="mt-10">
				<img src={logo} alt="Orchid Pharmed" className="h-20" />
			</header>
			<BrowserRouter basename="/">
				<Routes>
					{router.routes.map((route) => (
						<Route
							key={route.id}
							path={route.path}
							element={route.element}
						></Route>
					))}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

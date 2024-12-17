import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contexts from "@contexts/index";
import ErrorPage from "./components/ErrorPage";
import routes from "./routes";

import "./index.scss";

const router = createBrowserRouter([
    {
        id: "root",
        element: <routes.RootWrapper />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <routes.Home />,
            },
            {
                path: "/discord",
                element: <routes.Discord />,
            },
            {
                path: "/login",
                element: <Contexts><routes.Login /></Contexts>,
            },
            {
                path: "/register",
                element: <Contexts><routes.Register /></Contexts>,
            },
            {
                path: "/stats",
                element: <Contexts><routes.Stats /></Contexts>,
            },
            {
                path: "/leaderboard",
                element: <Contexts><routes.Leaderboard /></Contexts>,
            },
            {
                path: "/chat",
                element: <Contexts><routes.Chat /></Contexts>,
            },
            {
                path: "/market",
                element: <Contexts><routes.Market /></Contexts>,
            },
            {
                path: "/blues",
                element: <Contexts><routes.Blues /></Contexts>,
            },
            {
                path: "/settings",
                element: <Contexts><routes.Settings /></Contexts>,
            },
            {
                path: "/credits",
                element: <Contexts><routes.Credits /></Contexts>,
            },
            {
                path: "/store",
                element: <Contexts><routes.Store /></Contexts>,
            },
            {
                path: "/store/checkout/pro",
                element: <Contexts><routes.ProCheckout /></Contexts>,
            }
        ]
    }
]);

router.subscribe((location) => {
    if (location.location.pathname === "/") document.title = "Blulet";
    else document.title = `${location.location.pathname.slice(1).charAt(0).toUpperCase() + location.location.pathname.slice(2)} | Blulet`;
});


createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);

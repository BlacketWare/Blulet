import { useRouteError } from "react-router-dom";

interface RouterError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouterError;
    document.title = "Error | Blulet";

    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};
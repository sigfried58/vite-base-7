import { isRouteErrorResponse, useRouteError, Link } from "react-router";

export function GlobalErrorBoundary() {
    const error = useRouteError();

    let errorMessage = "An unexpected error occurred.";
    if (isRouteErrorResponse(error)) {
        errorMessage = error.data || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Oops! Something went wrong.</h1>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Link to="/home" style={{ padding: "0.5rem 1rem", background: "#f0f0f0", borderRadius: "4px", textDecoration: "none" }}>
                Go to Home
            </Link>
        </div>
    );
}

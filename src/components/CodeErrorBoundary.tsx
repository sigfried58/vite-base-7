import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class CodeErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service here (e.g., Sentry)
        console.error("Uncaught code error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "2rem", textAlign: "center", border: "2px solid red", borderRadius: "8px", margin: "1rem" }}>
                    <h2>Something went wrong in the component tree.</h2>
                    <details style={{ whiteSpace: "pre-wrap", color: "red", margin: "1rem 0", textAlign: "left" }}>
                        {this.state.error?.toString()}
                    </details>
                    <Link to="/home" onClick={() => this.setState({ hasError: false })} style={{ padding: "0.5rem 1rem", background: "#f0f0f0", borderRadius: "4px", textDecoration: "none" }}>
                        Go back Home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

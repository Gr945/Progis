import React, { ReactNode, Component, ErrorInfo } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    open: boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: undefined,
        open: false,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, open: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Можно логировать ошибку
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        if (this.state.hasError && this.state.error) {
            return (
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <Alert severity="error" onClose={this.handleClose} sx={{ width: '100%' }}>
                        {this.state.error.message}
                    </Alert>
                </Snackbar>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
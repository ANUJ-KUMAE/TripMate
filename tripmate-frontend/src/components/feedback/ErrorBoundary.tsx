import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <h2>Something went wrong</h2>
            <p>We apologize for the inconvenience. An unexpected error occurred.</p>
            {this.state.error && (
              <pre className="error-message">{this.state.error.message}</pre>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="btn btn-primary"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/app/store'
import { router } from '@/app/router'
import { ThemeProvider } from '@/context/ThemeProvider'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

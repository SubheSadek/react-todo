import type { FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from '../App';
import TodoDashboard from '../pages/TodoDashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env

const AppRoutes: FC = () => {

    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route element={<App />}>
                    <Route index element={<TodoDashboard />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }

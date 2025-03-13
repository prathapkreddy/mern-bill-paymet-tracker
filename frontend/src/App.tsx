import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContinueWithGoogle from './auth/continue.with.google.tsx';
import PrivateRoutes from './shared.components/private.route.tsx';
import Dashboard from './components/dashboard/dashboard.tsx';
import CreditCards from './components/credit.cards/credit.cards.tsx';
import Payments from './components/payments/payments.tsx';
import Account from './components/account/account.tsx';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={'/'} element={<PrivateRoutes />}>
                        <Route element={<Dashboard />} path="dashboard" />
                        <Route element={<CreditCards />} path="credit-cards" />
                        <Route element={<Payments />} path="payments" />
                        <Route element={<Account />} path="account" />
                    </Route>
                    <Route element={<ContinueWithGoogle />} path="/login" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

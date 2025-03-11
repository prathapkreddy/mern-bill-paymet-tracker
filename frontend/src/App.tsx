import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContinueWithGoogle from "./auth/continue.with.google.tsx";
import PrivateRoutes from "./common.components/private.route.tsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route element={<h1>Home</h1>} path="/"/>
                    </Route>
                    <Route element={<ContinueWithGoogle/>} path="/login"/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={ <Navigate to="/home" /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/login" element={ <Login /> } />
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Calendar from "../pages/Calendar/Calendar";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={ <Navigate to="/login" /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    )
}
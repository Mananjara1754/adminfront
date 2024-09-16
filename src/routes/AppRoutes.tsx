import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import React from "react";
import AccueilPage from "../pages/AccueilPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/accueil" element={<AccueilPage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
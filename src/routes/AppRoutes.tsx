import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import React from "react";
import AccueilPage from "../pages/AccueilPage";
import StatistiquePage from "../pages/StatistiquePage";
import CrudVoiturePage from "../pages/CrudVoiturePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/accueil" element={<AccueilPage />} />
                <Route path="/statistique" element={<StatistiquePage />} />
                <Route path="/crudVoiture" element={<CrudVoiturePage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
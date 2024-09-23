import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AccueilPage from "../pages/AccueilPage";
import StatistiquePage from "../pages/StatistiquePage";
import CrudVoiturePage from "../pages/CrudVoiturePage";
import FeuilleRoutePage from "../pages/FeuilleRoutePage";
import PeoplePage from "../pages/PeoplePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/accueil" element={<AccueilPage />} />
                <Route path="/statistique" element={<StatistiquePage />} />
                <Route path="/crudVoiture" element={<CrudVoiturePage />} />
                <Route path="/feuilleRoute" element={<FeuilleRoutePage />} />
                <Route path="/people" element={<PeoplePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
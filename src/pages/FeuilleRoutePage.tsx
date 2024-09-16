import Menu from "../components/Menu";
import "./style/FeuilleRoutePage.css"

const FeuilleRoutePage = ()=>{
    return(
        <div className="app">
        <Menu />
        <div className="main-content">
          <div className="container">
            <h1>Liste des véhicules</h1>
            <div className="liste-bus-container">
                <h3 className="bus-name">Voiture Num 1</h3>
              <table className="bus-table">
                <thead>
                  <tr>
                    <th>Nom & Prenom</th>
                    <th>Num Matricule</th>
                    <th>Heure</th>
                    <th>Arret</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}
export default FeuilleRoutePage;  
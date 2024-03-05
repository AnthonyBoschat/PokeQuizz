import {BrowserRouter as Routeur, Route,Routes} from "react-router-dom"
import Authentication from "./Components/Login/Authentication";
import Inscription from "./Components/Login/Inscription";
import CodeGiver from "./Components/Login/CodeGiver";
import "./Css/main.css"
import {Provider} from "react-redux"
import store from "./Redux/Store";
import Application from "./Components/Application/Application";
import Quizz from "./Components/Quizz/Quizz";
import Statistique from "./Components/Statistique/Statistique";
import Accueil from "./Components/Accueil/Accueil";


function App() {


  return (
    <Provider store={store}>
      <Routeur>
        <main>
          <Routes>
            <Route path="/" element={<Authentication />}/>
            <Route path="inscription" element={<Inscription />}/>
            <Route path="codeGiver" element={<CodeGiver />}/>
            <Route path="application/:userName/" element={<Application />}>
              <Route index path="accueil" element={<Accueil/>}/>
              <Route path="quizz" element={<Quizz/>}/>
              <Route path="statistique" element={<Statistique/>}/>
            </Route>
          </Routes>
        </main>
      </Routeur>
    </Provider>
    
  );
}

export default App;

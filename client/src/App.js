import './App.css';
import { Routes, Route} from "react-router-dom";
import LandingPage from "./Views/LandingPage/LandingPage/LandingPage"
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import FormPage from "./Views/FormPage/FormPage";



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home />} />
      <Route path="/recipes/:id" element={<Detail/>}/>
      <Route path="/createRecipe" element={<FormPage/>}/>
    </Routes>
    </div>
  );
}

export default App;

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Questionnaire from "./pages/Questionnaire";
import Recommendation from "./pages/Recommendation";
import API_Test from "./pages/API_Test";
import SelectCard from "./pages/SelectCard";
import Lifestyle_Benefit from "./pages/Lifestyle_Benefit";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="SelectCard" element={<SelectCard/>} />
          <Route path="Questionnaire" element={<Questionnaire />} />
          <Route path="Recommendation" element={<Recommendation />} />
          <Route path="Lifestyle_Benefit" element={<Lifestyle_Benefit />} />
          <Route path="API_Test" element={<API_Test />} />
          <Route path="*" element={<App.js />} /> {/* Do we need this? This line of code causes an error message in the browser's console. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
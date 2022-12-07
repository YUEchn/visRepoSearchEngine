import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './components/main/main';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
         path="/"
         element={<Main />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

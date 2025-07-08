import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/reset.css"

import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieTime from "./components/MovieTime";
import ChoseSeats from "./components/ChoseSeats";
import SuccessPage from "./components/SuccessPage";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/filme/:movieId" element={<MovieTime />} />
        <Route path="/sessao/:sessaoId" element={<ChoseSeats />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

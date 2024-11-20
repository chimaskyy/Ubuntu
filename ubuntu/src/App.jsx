import Header from "./components/Header"
import { CategoryNav } from "./components/Category";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Header />
      <CategoryNav/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Footer/>
      
    </>
  )
}

export default App

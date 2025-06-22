import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage.jsx"
import BeatsPage from "../pages/BeatsPage/BeatsPage.jsx"
import ContactPage from "../pages/ContactPage/ContactPage.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/beats" element={<BeatsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
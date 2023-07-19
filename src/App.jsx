
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage";
import Room from './pages/Room'
import { AuthProvider } from "./utils/AuthContext";

function App() {

  return (
    <Router>

      <AuthProvider>

            <Routes>

              <Route path='/login' element={<LoginPage></LoginPage>}></Route>
              <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
              
              <Route element={<PrivateRoutes></PrivateRoutes>}>
                <Route path='/' element={<Room></Room>}></Route>
              </Route>
            
            </Routes>

      </AuthProvider>

    </Router>

  )
}

export default App


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Passwordrecovery from './Pages/Passwordrecovery';
import Payement from './Pages/Payement';
import Reservation from './Pages/Reservation';
import Reserveform from './Pages/Reserveform';
import Services from './Pages/Services';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { AuthProvider } from './Components/AuthContexte';
function App() {
  return (
    <Router>

      <AuthProvider>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Password-recovery' element={<Passwordrecovery />} />
          <Route path="/Payement" element={<Payement />} />
          <Route path="/Reservation" element={<Reservation />} />
          <Route path="/Reservation/reserveform" element={< Reserveform />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Signin" element={< Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>


  )
}

export default App

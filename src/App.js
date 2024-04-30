import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Footer from './components/Footer'
import Auth from './pages/Auth';
import MovieSeatBooking from './pages/MovieSeatBooking';
import Dashboard from './pages/Dashboard';
import Pnf from './pages/Pnf';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home></Home>} ></Route>
      <Route path='/seat/:id' element={<MovieSeatBooking></MovieSeatBooking>} ></Route>
      <Route path='/login' element={<Auth></Auth>}></Route>
      <Route path='/register' element={<Auth register></Auth>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/*' element={<Pnf></Pnf> }></Route>
     </Routes>
     <Footer></Footer>
    </div>
  );
}

export default App;

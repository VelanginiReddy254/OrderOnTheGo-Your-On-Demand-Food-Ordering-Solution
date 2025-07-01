
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js';
import { CartProvider } from './components/ContextReducer.js';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder/>} />
        </Routes>

      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

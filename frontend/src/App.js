import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Trades from "./pages/trades";
import Reviews from "./pages/Reviews";
import Performance from "./pages/Performance";
import Sidebar from "./pages/Sidebar";
import Item from "./pages/Item";
import "./styles/App.css"

function App() {
    return (
        <Router>
            <div className="app-shell">
                <nav className="topnav">
                    <div className="brand">Review</div>
                    <div className="navlinks">
                        <NavLink to="/" end className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}>홈</NavLink>
                        <NavLink to="/trades" className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}>거래 기록</NavLink>
                        <NavLink to="/reviews" className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}>투자 리뷰</NavLink>
                        <NavLink to="/performance" className={({ isActive }) => `navlink${isActive ? ' active' : ''}`}>성과</NavLink>
                    </div>
                </nav>
                <main className="container">
                    <Sidebar />
                    <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/trades" element={<Trades />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/performance" element={<Performance />} />
                        <Route path={"/item"} element={<Item />} />
                    </Routes>
                    </div>
                </main>
            
            </div>
        </Router>
    );
}

export default App;

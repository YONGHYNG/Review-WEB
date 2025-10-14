import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Trades from "./pages/trades";
import Reviews from "./pages/Reviews";
import Performance from "./pages/Performance";
import Sidebar from "./pages/Sidebar";
import Item from "./pages/Item";
import CardDetail from "./pages/CardDetail";
import "./styles/App.css"

// 커스텀 훅: 모달 열릴 때 body 스크롤 막기
function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [isLocked]);
}

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    useBodyScrollLock(isModalOpen);
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
                            <Route path="/card/:id" element={<CardDetail />} />
                        </Routes>
                    </div>
                </main>
            
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>모달 예시</h2>
                        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                            {/* 모달 내부 스크롤 허용 */}
                            <p>여기에 긴 내용...</p>
                        </div>
                        <button onClick={() => setIsModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}
        </Router>
    );
}

export default App;

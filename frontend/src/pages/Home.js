import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import '../styles/Home.css';

const mockPosts = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    title: `게시판 테스트 제목입니다. ${i + 1}`,
    author: `작성자${Math.floor(i / 5) + 1}`,
    date: `2025-09-${String(16 - Math.floor(i / 10)).padStart(2, '0')}`,
}));

const assetData = {
    "1d": [
        { time: "09:00", value: 45 },
        { time: "12:00", value: 46 },
        { time: "15:00", value: 48 },
        { time: "18:00", value: 47 },
        { time: "21:00", value: 49 },
    ],
    "3d": [
        { time: "Day1", value: 42 },
        { time: "Day2", value: 44 },
        { time: "Day3", value: 48 },
    ],
    "1m": [
        { time: "1주차", value: 40 },
        { time: "2주차", value: 42 },
        { time: "3주차", value: 45 },
        { time: "4주차", value: 48 },
    ],
    "1y": [
        { time: "1월", value: 35 },
        { time: "4월", value: 40 },
        { time: "7월", value: 45 },
        { time: "9월", value: 48 },
    ],
};

function Home() {
    const [showBalance, setShowBalance] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [period, setPeriod] = useState("1d");
    const postsPerPage = 10;
    const pagesToShow = 5; // 한 번에 보여줄 페이지 개수

    const totalBalance = 48.78;
    const usdBalance = 48.80;
    const profitRate = 12.5;
    const profitAmount = 5.43;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(mockPosts.length / postsPerPage);

    // ===== 페이지네이션 5개씩 계산 =====
    const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="home-layout">
            {/* ====== 내 자산 섹션 ====== */}
            <div className="asset-section panel">
                <div className="home-balance-header">
                    <span className="home-balance-label">총 자산</span>
                    <button
                        className="home-balance-toggle"
                        onClick={() => setShowBalance(!showBalance)}
                    >
                        {showBalance ? "👁️" : "🙈"}
                    </button>
                </div>
                <div className="home-balance-amount">
                    <span className="home-balance-value">
                        {showBalance ? `${totalBalance} USDT` : "*** USDT"}
                    </span>
                </div>
                <div className="home-balance-usd">
                    ≈ {showBalance ? `${usdBalance} USD` : "*** USD"}
                </div>
                <div className="home-profit-section">
                    <div className="home-profit-layout">
                        <div>
                            <div className="home-profit-rate-label">수익률</div>
                            <div className={`home-profit-rate-value ${profitRate >= 0 ? "positive" : "negative"}`}>
                                {profitRate >= 0 ? "+" : ""}{profitRate}%
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div className="home-profit-amount-label">수익 금액</div>
                            <div className={`home-profit-amount-value ${profitAmount >= 0 ? "positive" : "negative"}`}>
                                {profitAmount >= 0 ? "+" : ""}{profitAmount} USDT
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====== 자산 추이 차트 ====== */}
                <div className="asset-chart-section">
                    <div className="chart-header">
                        <span>내 자산 추이</span>
                        <div className="chart-period-buttons">
                            {["1d", "3d", "1m", "1y"].map(p => (
                                <button
                                    key={p}
                                    className={period === p ? "active" : ""}
                                    onClick={() => setPeriod(p)}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={assetData[period]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ====== 게시판 섹션 ====== */}
            <div className="board-section panel">
                <h2 className="board-title">최신글</h2>
                <table className="board-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* ====== 페이지네이션 ====== */}
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &lt; 이전
                    </button>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        다음 &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;

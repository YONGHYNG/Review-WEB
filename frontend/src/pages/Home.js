import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "../styles/Home.css";

// 5개 카드 mock 데이터 (승/패 번갈아)
const cardData = [
    { id: 1, result: "승", profit: "+120,000", entry: "24,000", exit: "25,200", asset: "1,120,000" },
    { id: 2, result: "패", loss: "-80,000", stop: "23,200", asset: "1,040,000" },
    { id: 3, result: "승", profit: "+60,000", entry: "22,000", exit: "22,600", asset: "1,100,000" },
    { id: 4, result: "패", loss: "-30,000", stop: "21,700", asset: "1,070,000" },
    { id: 5, result: "승", profit: "+40,000", entry: "20,000", exit: "20,400", asset: "1,090,000" },
    { id: 6, result: "승", profit: "+40,000", entry: "20,000", exit: "20,400", asset: "1,090,000" },
    { id: 7, result: "승", profit: "+40,000", entry: "20,000", exit: "20,400", asset: "1,090,000" },
    { id: 8, result: "승", profit: "+40,000", entry: "20,000", exit: "20,400", asset: "1,090,000" },
];

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
    const [period, setPeriod] = useState("1d");
    const totalBalance = 48.78;
    const usdBalance = 48.8;
    const profitRate = 12.5;
    const profitAmount = 5.43;

        // 승/패 전적 계산
        const winCount = cardData.filter(card => card.result === "승").length;
        const loseCount = cardData.filter(card => card.result === "패").length;

        return (
            <div className="home-layout new-layout">
                {/* 좌측: 자산 */}
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
                                <div
                                    className={`home-profit-rate-value ${
                                        profitRate >= 0 ? "positive" : "negative"
                                    }`}
                                >
                                    {profitRate >= 0 ? "+" : ""}
                                    {profitRate}%
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div className="home-profit-amount-label">수익 금액</div>
                                <div
                                    className={`home-profit-amount-value ${
                                        profitAmount >= 0 ? "positive" : "negative"
                                    }`}
                                >
                                    {profitAmount >= 0 ? "+" : ""}
                                    {profitAmount} USDT
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 자산 추이 차트 */}
                    <div className="asset-chart-section">
                        <div className="chart-header">
                            <span>내 자산 추이</span>
                            <div className="chart-period-buttons">
                                {["1d", "3d", "1m", "1y"].map((p) => (
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
                        <ResponsiveContainer width="100%" minWidth={240} height={120}>
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
                {/* 우측: 카드 5개 */}
                <div className="right-card-section">
                    <div className="card-list horizontal">
                        {cardData.slice(0, 8).map((post) => (
                            <div key={post.id} className={`trade-card ${post.result === "승" ? "win" : "lose"}`}>
                                <div className="trade-card-header">
                                    <span className="trade-card-result">{post.result}</span>
                                </div>
                                <div className="trade-card-info-col">
                                    {post.result === "승" ? (
                                        <>
                                            <div>수익 금액: {post.profit}</div>
                                            <div>진입가: {post.entry}</div>
                                            <div>익절가: {post.exit}</div>
                                            <div>현재 자산: {post.asset}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>손실 금액: {post.loss}</div>
                                            <div>손절가: {post.stop}</div>
                                            <div>현재 자산: {post.asset}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 하단: 총 전적 */}
                <div className="total-record">
                    총 전적: {winCount}승 {loseCount}패
                </div>
            </div>
        );
}

export default Home;

import React, { useState, useRef, useCallback, useEffect } from "react";
import '../styles/Home.css';

function Home() {
    const [showBalance, setShowBalance] = useState(true);
    
    // --- 추가된 코드 시작 ---
    const [leftPanelWidth, setLeftPanelWidth] = useState(40); // 왼쪽 패널 너비 (초기값 40%)
    const isResizing = useRef(false);
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = useCallback((e) => {
        if (!isResizing.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // 패널의 최소/최대 너비 제한 (예: 20% ~ 80%)
        if (newLeftWidth > 20 && newLeftWidth < 80) {
            setLeftPanelWidth(newLeftWidth);
        }
    }, []);

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);
    // --- 추가된 코드 끝 ---

    // 샘플 데이터
    const totalBalance = 48.78;
    const usdBalance = 48.80;
    const profitRate = 12.5; // 수익률 %
    const profitAmount = 5.43; // 수익 금액
    
    // 차트 데이터 (샘플)
    const chartData = [
        { time: '00:00', value: 43.2 }, { time: '02:00', value: 43.8 },
        { time: '04:00', value: 44.1 }, { time: '06:00', value: 44.5 },
        { time: '08:00', value: 45.8 }, { time: '10:00', value: 46.2 },
        { time: '12:00', value: 47.2 }, { time: '14:00', value: 47.8 },
        { time: '16:00', value: 46.9 }, { time: '18:00', value: 47.5 },
        { time: '20:00', value: 48.1 }, { time: '22:00', value: 48.4 },
        { time: '24:00', value: 48.78 }
    ];

    return (
        <div className="container">
            <div className="panel home-panel">
                {/* ref를 메인 레이아웃에 추가 */}
                <div className="home-main-layout" ref={containerRef}>
                    {/* 왼쪽: 잔고 정보 (너비를 state로 제어) */}
                    <div className="home-balance-section" style={{ width: `${leftPanelWidth}%` }}>
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
                            <span className="home-balance-dropdown">▼</span>
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
                    </div>

                    {/* --- 추가된 코드: 리사이즈 바 --- */}
                    <div 
                        className="resizer" 
                        onMouseDown={handleMouseDown}
                    />

                    {/* 오른쪽: 차트 */}
                    <div className="home-chart-section">
                        <div className="home-chart-header">
                            <h3 className="home-chart-title">자산 변동</h3>
                            <button className="home-chart-toggle">▼</button>
                        </div>
                        <div className="home-chart-container">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05"/>
                                    </linearGradient>
                                </defs>
                                <polyline
                                    fill="none"
                                    stroke="var(--primary)"
                                    strokeWidth="0.5" // SVG viewBox 기준으로 두께 조정
                                    points={chartData.map((point, index) => {
                                        const x = (index / (chartData.length - 1)) * 100;
                                        const y = 100 - ((point.value - 43) / (49 - 43)) * 100;
                                        return `${x},${y}`;
                                    }).join(' ')}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <polygon
                                    fill="url(#chartGradient)"
                                    points={`0,100 ${chartData.map((point, index) => {
                                        const x = (index / (chartData.length - 1)) * 100;
                                        const y = 100 - ((point.value - 43) / (49 - 43)) * 100;
                                        return `${x},${y}`;
                                    }).join(' ')} 100,100`}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
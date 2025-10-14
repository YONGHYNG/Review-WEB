import React, { useState } from "react";
import '../styles/Performance.css';


function Performance() {
    const [selectedPeriod, setSelectedPeriod] = useState('1M');
    
    // 샘플 성과 데이터
    const performanceData = {
        totalReturn: 12.5,
        totalReturnAmount: 5.43,
        winRate: 68.5,
        totalTrades: 24,
        avgReturn: 2.1,
        maxDrawdown: -3.2,
        sharpeRatio: 1.8
    };
    
    // 차트 데이터 (월별 수익률)
    const monthlyData = [
        { month: '1월', return: 2.1, amount: 0.89 },
        { month: '2월', return: -1.2, amount: -0.52 },
        { month: '3월', return: 4.3, amount: 1.87 },
        { month: '4월', return: 1.8, amount: 0.78 },
        { month: '5월', return: 3.2, amount: 1.39 },
        { month: '6월', return: 2.3, amount: 1.02 }
    ];
    
    const maxReturn = Math.max(...monthlyData.map(d => d.return));
    const minReturn = Math.min(...monthlyData.map(d => d.return));

    return (
        <div className="container">
            <div className="performance-header">
                <h2>투자 성과</h2>
                <p>자산 대비 수익률과 투자 지표를 확인하세요</p>
            </div>
            
            {/* 기간 선택 */}
            <div className="performance-period-selector">
                <div className="performance-period-buttons">
                    {['1W', '1M', '3M', '6M', '1Y'].map(period => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={selectedPeriod === period ? "performance-period-btn" : "performance-period-btn ghost"}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* 주요 지표 카드들 */}
            <div className="performance-metrics-grid">
                <div className="panel performance-metric-card">
                    <div className="performance-metric-label">총 수익률</div>
                    <div className={`performance-metric-value ${performanceData.totalReturn >= 0 ? "positive" : "negative"}`}>
                        {performanceData.totalReturn >= 0 ? "+" : ""}{performanceData.totalReturn}%
                    </div>
                    <div className="performance-metric-subtext">
                        {performanceData.totalReturnAmount >= 0 ? "+" : ""}{performanceData.totalReturnAmount} USDT
                    </div>
                </div>
                
                <div className="panel performance-metric-card">
                    <div className="performance-metric-label">승률</div>
                    <div className="performance-metric-value neutral">
                        {performanceData.winRate}%
                    </div>
                    <div className="performance-metric-subtext">
                        {performanceData.totalTrades}회 거래
                    </div>
                </div>
                
                <div className="panel performance-metric-card">
                    <div className="performance-metric-label">평균 수익률</div>
                    <div className={`performance-metric-value ${performanceData.avgReturn >= 0 ? "positive" : "negative"}`}>
                        {performanceData.avgReturn >= 0 ? "+" : ""}{performanceData.avgReturn}%
                    </div>
                    <div className="performance-metric-subtext">
                        거래당 평균
                    </div>
                </div>
                
                <div className="panel performance-metric-card">
                    <div className="performance-metric-label">최대 손실</div>
                    <div className="performance-metric-value negative">
                        {performanceData.maxDrawdown}%
                    </div>
                    <div className="performance-metric-subtext">
                        최대 낙폭
                    </div>
                </div>
            </div>
            
            {/* 월별 수익률 차트 */}
            <div className="panel performance-chart-section">
                <h3 className="performance-chart-title">월별 수익률</h3>
                <div className="performance-chart-container">
                    <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                        {/* Y축 기준선 */}
                        <line
                            x1="10%"
                            y1="50%"
                            x2="90%"
                            y2="50%"
                            stroke="var(--border)"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                        />
                        
                        {/* 막대 차트 */}
                        {monthlyData.map((data, index) => {
                            const x = 10 + (index * 80 / (monthlyData.length - 1));
                            const height = Math.abs(data.return) * 4; // 스케일 조정
                            const y = data.return >= 0 ? 50 - height : 50;
                            
                            return (
                                <g key={index}>
                                    {/* 막대 */}
                                    <rect
                                        x={`${x - 3}%`}
                                        y={`${y}%`}
                                        width="6%"
                                        height={`${height}%`}
                                        fill={data.return >= 0 ? "var(--accent)" : "var(--danger)"}
                                        opacity="0.8"
                                    />
                                    
                                    {/* 월 라벨 */}
                                    <text
                                        x={`${x}%`}
                                        y="95%"
                                        textAnchor="middle"
                                        fill="var(--muted)"
                                        fontSize="12"
                                    >
                                        {data.month}
                                    </text>
                                    
                                    {/* 수익률 값 */}
                                    <text
                                        x={`${x}%`}
                                        y={`${y - 5}%`}
                                        textAnchor="middle"
                                        fill="var(--text)"
                                        fontSize="10"
                                        fontWeight="bold"
                                    >
                                        {data.return >= 0 ? "+" : ""}{data.return}%
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
                
                {/* 범례 */}
                <div className="performance-chart-legend">
                    <div className="performance-legend-item">
                        <div className="performance-legend-color profit"></div>
                        <span className="performance-legend-text">수익</span>
                    </div>
                    <div className="performance-legend-item">
                        <div className="performance-legend-color loss"></div>
                        <span className="performance-legend-text">손실</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Performance;



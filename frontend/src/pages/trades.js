import { useEffect, useMemo, useState } from "react";
import '../styles/trades.css';


function Trades() {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [tradeType, setTradeType] = useState("buy");
    const [trades, setTrades] = useState(() => {
        try {
            const raw = localStorage.getItem("trades");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    const [error, setError] = useState("");
    useEffect(() => {
        localStorage.setItem("trades", JSON.stringify(trades));
    }, [trades]);
    const totalCost = useMemo(() => {
        const q = Number(quantity || 0);
        const p = Number(price || 0);
        return q * p;
    }, [quantity, price]);
    const resetForm = () => {
        setSymbol("");
        setQuantity("");
        setPrice("");
        setTradeType("buy");
        setError("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!symbol.trim()) return setError("종목코드를 입력하세요.");
        const q = Number(quantity);
        const p = Number(price);
        if (!q || q <= 0) return setError("수량은 1 이상이어야 합니다.");
        if (!p || p <= 0) return setError("가격은 0보다 커야 합니다.");
        const newTrade = {
            id: Date.now(),
            symbol: symbol.trim().toUpperCase(),
            quantity: q,
            price: p,
            tradeType,
            createdAt: new Date().toISOString()
        };
        setTrades([newTrade, ...trades]);
        resetForm();
    };
    const handleDelete = (id) => {
        setTrades(trades.filter((t) => t.id !== id));
    };
    return (
        <div className="trades-board">
            <section className="trades-main">
                <div className="panel trades-composer">
                    <h2>거래 기록 추가</h2>
                    <form className="trades-form" onSubmit={handleSubmit}>
                        <div className="trades-field">
                            <label>종목코드</label>
                            <input
                                className="trades-input"
                                type="text"
                                placeholder="예: AAPL"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                            />
                        </div>
                        <div className="trades-field">
                            <label>수량</label>
                            <input
                                className="trades-input"
                                type="number"
                                inputMode="numeric"
                                min="1"
                                placeholder="예: 10"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="trades-field">
                            <label>가격</label>
                            <input
                                className="trades-input"
                                type="number"
                                inputMode="decimal"
                                step="0.01"
                                placeholder="예: 150.25"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="trades-field">
                            <label>유형</label>
                            <select className="trades-select" value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
                                <option value="buy">매수</option>
                                <option value="sell">매도</option>
                            </select>
                        </div>
                        {error && <div className="trades-error">{error}</div>}
                        <div className="trades-actions">
                            <button className="trades-btn" type="submit">저장</button>
                            <span className="trades-cost-preview">예상 금액: {Number.isFinite(totalCost) ? totalCost.toLocaleString() : 0}</span>
                        </div>
                    </form>
                    <h3>최근 거래</h3>
                    {trades.length === 0 ? (
                        <div className="trades-error">저장된 거래가 없습니다.</div>
                    ) : (
                        <ul className="trades-list">
                            {trades.map((t) => (
                                <li key={t.id} className="trades-post">
                                    <div className="trades-post-header">
                                        <div className="trades-post-title">
                                            {t.symbol} · <span className={`trades-post-type ${t.tradeType}`}>{t.tradeType === "buy" ? "매수" : "매도"}</span>
                                        </div>
                                    </div>
                                    <div className="trades-post-meta">{t.quantity}주 @ {t.price.toLocaleString()} · {new Date(t.createdAt).toLocaleString()}</div>
                                    <div className="trades-post-actions">
                                        <button className="trades-delete-btn" onClick={() => handleDelete(t.id)}>삭제</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Trades;

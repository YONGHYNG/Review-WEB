import { useEffect, useMemo, useState } from "react";

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

        // 추후 백엔드 연동 예정
        // fetch("http://localhost:8080/api/trades", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(newTrade)
        // })
    };

    const handleDelete = (id) => {
        setTrades(trades.filter((t) => t.id !== id));
    };

    return (
        <div style={{ padding: "24px", maxWidth: 720, margin: "0 auto" }}>
            <h2>거래 기록 추가</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
                <div style={{ display: "grid", gap: 8 }}>
                    <label>종목코드</label>
                    <input
                        type="text"
                        placeholder="예: AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                    <label>수량</label>
                    <input
                        type="number"
                        inputMode="numeric"
                        min="1"
                        placeholder="예: 10"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                    <label>가격</label>
                    <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        placeholder="예: 150.25"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                    <label>유형</label>
                    <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
                        <option value="buy">매수</option>
                        <option value="sell">매도</option>
                    </select>
                </div>

                {error && (
                    <div style={{ color: "#b00020" }}>{error}</div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button type="submit">저장</button>
                    <span style={{ color: "#555" }}>예상 금액: {Number.isFinite(totalCost) ? totalCost.toLocaleString() : 0}</span>
                </div>
            </form>

            <h3 style={{ marginTop: 24 }}>최근 거래</h3>
            {trades.length === 0 ? (
                <div style={{ color: "#666" }}>저장된 거래가 없습니다.</div>
            ) : (
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
                    {trades.map((t) => (
                        <li key={t.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>
                                    {t.symbol} · {t.tradeType === "buy" ? "매수" : "매도"}
                                </div>
                                <div style={{ color: "#555", fontSize: 14 }}>
                                    {t.quantity}주 @ {t.price.toLocaleString()} · {new Date(t.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <button onClick={() => handleDelete(t.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Trades;

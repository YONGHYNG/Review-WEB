import React, { useState } from "react";
import "../styles/Item.css";

function Item() {
    const [stocks, setStocks] = useState([]);
    const [input, setInput] = useState("");

    const addStock = () => {
        if (input.trim() === "") return;
        const newStock = {
            id: Date.now(),
            name: input.trim(),
        };
        setStocks([...stocks, newStock]);
        setInput("");
    };

    const removeStock = (id) => {
        setStocks(stocks.filter(stock => stock.id !== id));
    };

    return (
        <div className="board-page">
            <h2>📌 나의 관심 종목</h2>

            {/* 입력창 */}
            <div className="stock-input">
                <input
                    type="text"
                    placeholder="관심 종목 입력 (예: 삼성전자)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addStock}>추가</button>
            </div>

            {/* 카드 목록 */}
            <div className="stock-card-list">
                {stocks.map(stock => (
                    <div key={stock.id} className="stock-card">
                        <span>{stock.name}</span>
                        <button onClick={() => removeStock(stock.id)}>❌</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Item;

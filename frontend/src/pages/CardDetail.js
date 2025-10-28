//             <div className="card-review">
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CardDetail.css';

function CardDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [card, setCard] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCard = async () => {
			try {
				// fetch from backend (same origin/port as Home.js)
				const res = await fetch('http://localhost:8080/api/cards');
				if (!res.ok) throw new Error('Failed to fetch cards');
				const data = await res.json();
				const found = data.find(c => String(c.id) === String(id));
				if (!found) {
					setError('Card not found');
				} else {
					setCard(found);
				}
			} catch (err) {
				setError(err.message || 'Unknown error');
			} finally {
				setLoading(false);
			}
		};
		fetchCard();
	}, [id]);

	if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
	if (error) return <div style={{ padding: 20 }}>Error: {error}</div>;

	return (
		<div className="card-detail-root">
			<div className="card-detail-wrap">
				<button className="back-btn" onClick={() => navigate(-1)}>← 뒤로</button>
				<div className="card-detail">
					<div className="card-main">
						<h2>
							거래번호 #{card.tradeNo}{' '}
							<span className={`result-pill ${card.result === 'WIN' ? 'win' : 'lose'}`}>
								{card.result === 'WIN' ? '승' : '패'}
							</span>
						</h2>
						<div className="card-meta">
							<div>날짜: {card.tradeDate}</div>
						</div>

						<div className="card-financials">
							<div>
								<div className="label">투자금</div>
								<div className="value">{card.investAmount != null ? card.investAmount.toLocaleString() + '원' : '-'}</div>
							</div>
							<div>
								<div className="label">진입가</div>
								<div className="value">{card.entryPrice != null ? card.entryPrice.toLocaleString() : '-'}</div>
							</div>
							<div>
								<div className="label">손익</div>
								<div className="value">
									{card.profitAmount != null
										? card.profitAmount.toLocaleString() + '원'
										: card.lossAmount != null
										? '-' + card.lossAmount.toLocaleString() + '원'
										: '-'}
								</div>
							</div>
						</div>

						<div className="card-review">
							<h3>리뷰</h3>
							<p>{card.review || '작성 없음'}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardDetail;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const CARDS_PER_PAGE = 9; // 3x3

function Home() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ 백엔드 API 호출
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/cards');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const pagedCards = cards.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  // ✅ 더미 통계 (원하면 DB 계산으로 변경 가능)
  const dummyStats = {
    asset: 12000000,
    profit: 350000,
    record: {
      win: cards.filter(c => c.result === 'WIN').length,
      lose: cards.filter(c => c.result === 'LOSE').length
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-root">
      {/* 상단 통계 카드 (왼쪽) + 글작성 버튼 (오른쪽) */}
      <div className="home-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div className="home-top-cards">
          <div className="stat-card">
            <div className="stat-title">현재 자산</div>
            <div className="stat-value">{dummyStats.asset.toLocaleString()}원</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">총 수익</div>
            <div className="stat-value">{dummyStats.profit.toLocaleString()}원</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">전적</div>
            <div className="stat-value">
              {dummyStats.record.win + dummyStats.record.lose}전 {dummyStats.record.win}승 {dummyStats.record.lose}패
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="write-btn" onClick={() => navigate('/card/write')} style={{ cursor: 'pointer' }}>글 작성</button>
        </div>
      </div>

      {/* 카드 목록 */}
      <div className="home-card-grid">
        {pagedCards.map(card => (
          <div
            className="trade-card"
            key={card.id}
            onClick={() => navigate(`/card/${card.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="trade-card-header">
              <span>거래번호 #{card.tradeNo}</span>
              <span className={`result-badge ${card.result === 'WIN' ? 'win' : 'lose'}`}>
                {card.result === 'WIN' ? '승' : '패'}
              </span>
            </div>

            <div className="trade-card-date">{card.tradeDate}</div>

            {/* 추가 데이터 출력: 투자금, 진입가, 손익(있을 경우), 리뷰(간략) */}
            <div className="trade-card-body">
              <div className="trade-row">
                <strong>투자금:</strong>
                <span>{card.investAmount != null ? card.investAmount.toLocaleString() + '원' : '-'}</span>
              </div>
              <div className="trade-row">
                <strong>진입가:</strong>
                <span>{card.entryPrice != null ? card.entryPrice.toLocaleString() : '-'}</span>
              </div>
              <div className="trade-row">
                <strong>손익:</strong>
                <span>
                  {card.profitAmount != null
                    ? card.profitAmount.toLocaleString() + '원'
                    : card.lossAmount != null
                    ? '-' + card.lossAmount.toLocaleString() + '원'
                    : '-'}
                </span>
              </div>
              <div className="trade-row review-row">
                <strong>리뷰:</strong>
                <span>{card.review ? (card.review.length > 60 ? card.review.slice(0, 60) + '...' : card.review) : '작성 없음'}</span>
              </div>
            </div>

            <div className={`corner-square ${card.result === 'WIN' ? 'win' : 'lose'}`}></div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="home-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>&gt;</button>
      </div>
    </div>
  );
}

export default Home;

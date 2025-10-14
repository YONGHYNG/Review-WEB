import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCardById } from '../data/cards';
import '../styles/CardDetail.css';

function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = getCardById(id);

  if (!card) return <div style={{padding:20}}>카드를 찾을 수 없습니다.</div>;

  return (
    <div className="card-detail-root">
      <div className="card-detail-wrap">
        <button className="back-btn" onClick={() => navigate(-1)}>← 뒤로</button>
        <div className="card-detail">
          <div className="card-main">
            <h2>{card.title} <span className={`result-pill ${card.result}`}>{card.result === 'win' ? '승' : '패'}</span></h2>
            <div className="card-meta">
              <div>날짜: {card.date}</div>
            </div>

            <div className="card-financials">
              <div>
                <div className="label">투자금액</div>
                <div className="value">{card.investment.toLocaleString()}원</div>
              </div>
              <div>
                <div className="label">진입가</div>
                <div className="value">{card.entryPrice.toLocaleString()}원</div>
              </div>
              <div>
                <div className="label">익절가</div>
                <div className="value">{card.targetPrice.toLocaleString()}원</div>
              </div>
              <div>
                <div className="label">익절금액(예상)</div>
                <div className="value">{card.targetAmount.toLocaleString()}원</div>
              </div>
              <div>
                <div className="label">손절가</div>
                <div className="value">{card.stopPrice.toLocaleString()}원</div>
              </div>
              <div>
                <div className="label">손절금액(예상)</div>
                <div className="value">{card.stopAmount.toLocaleString()}원</div>
              </div>
            </div>

            <div className="card-review">
              <h3>투자 리뷰</h3>
              <p>{card.review}</p>
            </div>
          </div>

          <aside className="card-aside">
            <div className="card-images">
              <img className="main-img" src={card.images[0]} alt="main" />
              <div className="thumbs">
                {card.images.map((src, idx) => (
                  <img key={idx} src={src} alt={`thumb-${idx}`} />
                ))}
              </div>
            </div>
            <div className="badge-small">ID: {card.id}</div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;

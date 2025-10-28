import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CardWrite.css';

function CardWrite() {
  const navigate = useNavigate();
  const [investAmount, setInvestAmount] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.length > 500) {
      setError('리뷰는 500자 이내로 입력하세요.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('investAmount', investAmount);
      formData.append('entryPrice', entryPrice);
      formData.append('profitAmount', profit);
      formData.append('review', review);
      images.forEach((file, idx) => formData.append('images', file));

      // Attempt to POST to backend. If backend doesn't accept multipart, you can switch to JSON.
      const res = await fetch('http://localhost:8080/api/cards', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create card');
      }

      // On success, go back to home
      navigate('/');
    } catch (err) {
      setError(err.message || '제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card-write-root">
      <div className="card-write-wrap">
        <button className="back-btn" onClick={() => navigate(-1)}>← 뒤로</button>
        <h2 className="write-title">글 작성</h2>

        <form className="card-write-form" onSubmit={handleSubmit}>
          <label>
            투자금
            <input type="number" value={investAmount} onChange={e => setInvestAmount(e.target.value)} placeholder="투자금액" required />
          </label>

          <label>
            진입가
            <input type="number" value={entryPrice} onChange={e => setEntryPrice(e.target.value)} placeholder="진입가" required />
          </label>

          <label>
            손익
            <input type="number" value={profit} onChange={e => setProfit(e.target.value)} placeholder="손익 (음수 허용)" />
          </label>

          <label>
            리뷰 <span className="char-count">{review.length}/500</span>
            <textarea value={review} onChange={e => setReview(e.target.value)} maxLength={500} placeholder="리뷰를 작성하세요 (최대 500자)" required />
          </label>

          <label className="file-label">
            이미지 추가
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          </label>

          {previews.length > 0 && (
            <div className="image-previews">
              {previews.map((src, i) => (
                <img src={src} alt={`preview-${i}`} key={i} />
              ))}
            </div>
          )}

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="primary" disabled={submitting}>{submitting ? '저장중...' : '저장'}</button>
            <button type="button" className="secondary" onClick={() => navigate(-1)}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardWrite;

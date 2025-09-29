import React, { useState, useMemo } from "react";
import '../styles/trades.css';

const mockCompanies = [

];

function Trades() {
  // 거래 데이터 (실제는 API 연동, 여기선 mock)
  const [trades, setTrades] = useState(() => {
    try {
      const raw = localStorage.getItem("trades");
      return raw ? JSON.parse(raw) : Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        company: mockCompanies[i % mockCompanies.length].name,
        position: [
          '웹 개발자(3년차 이상)',
          '웹 풀스택 개발자 (2년차)',
          'React 웹 프론트엔드',
          '비전Dev 백엔드 개발자',
          '백엔드 개발자',
          'JAVA 백엔드 개발자',
          '소프트웨어 개발',
          '플랫폼개발(경영혁신)',
          '백엔드 개발자',
          'Full-Stack 개발자',
        ][i % 10],
        createdAt: '2025. 9. 24',
        status: ['접수', '열람'][i % 2],
        recommend: '추천인 없음',
      }));
    } catch {
      return [];
    }
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const filtered = useMemo(() =>
    trades.filter(t =>
      t.company.includes(search) || t.position.includes(search)
    ), [trades, search]);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  // 통계 mock
  const stats = {
    total: trades.length,
    done: 37,
    pass: 1,
    final: 0,
    fail: 127,
  };

  return (
    <div className="trades-dashboard-layout">
      {/* 메인 */}
      <main className="trades-main-content">
        {/* 상단 통계 */}
        <div className="trades-stats-bar">
          <div className="trades-stat"><div className="stat-num">{stats.total}</div><div className="stat-label">전체</div></div>
          <div className="trades-stat done"><div className="stat-num">{stats.done}</div><div className="stat-label">상승 종목</div></div>
          <div className="trades-stat"><div className="stat-num">{stats.pass}</div><div className="stat-label">하락 종목</div></div>
          <div className="trades-stat"><div className="stat-num">{stats.final}</div><div className="stat-label">등록 후 수익율</div></div>
          <div className="trades-stat fail"><div className="stat-num">{stats.fail}</div><div className="stat-label">개선점</div></div>
        </div>
        {/* 테이블 */}
        <div className="trades-table-wrap">
          <table className="trades-table">
            <thead>
              <tr>
                <th>종목</th>
                <th>진입 가격</th>
                <th>매수 금액</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && <tr><td colSpan={5} style={{textAlign:'center'}}>데이터 없음</td></tr>}
              {paged.map((t, i) => (
                <tr key={t.id}>
                  <td>{t.company}</td>
                  <td>{t.position}</td>
                  <td>{t.createdAt}</td>
                  <td>{t.status}</td>
                  <td>{t.recommend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        <div className="trades-pagination">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>&lt;</button>
          {Array.from({length: totalPages}, (_,i)=>i+1).map(p=>(
            <button key={p} className={p===page?"active":''} onClick={()=>setPage(p)}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>&gt;</button>
        </div>
      </main>
    </div>
  );
}

export default Trades;

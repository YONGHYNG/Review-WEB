import React, { useMemo, useState } from "react";

function Reviews() {
    const [title, setTitle] = useState("");
    const [mood, setMood] = useState("neutral");
    const [body, setBody] = useState("");
    const [posts, setPosts] = useState(() => {
        try {
            const raw = localStorage.getItem("review-posts");
            return raw ? JSON.parse(raw) : [
                { id: 1, title: "첫 복기: 욕심을 줄이자", mood: "reflect", createdAt: new Date().toISOString(), body: "익절 타이밍을 놓쳤다. 계획된 수익률에서 부분 청산을 연습하자." },
                { id: 2, title: "손절 규칙 재정비", mood: "discipline", createdAt: new Date().toISOString(), body: "-2% 도달 시 즉시 손절. 희망회로 금지." }
            ];
        } catch {
            return [];
        }
    });

    const remaining = useMemo(() => 500 - body.length, [body]);

    const submit = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;
        const next = [{ id: Date.now(), title: title.trim(), mood, body: body.trim(), createdAt: new Date().toISOString() }, ...posts];
        setPosts(next);
        localStorage.setItem("review-posts", JSON.stringify(next));
        setTitle("");
        setMood("neutral");
        setBody("");
    };

    const remove = (id) => {
        const next = posts.filter(p => p.id !== id);
        setPosts(next);
        localStorage.setItem("review-posts", JSON.stringify(next));
    };

    return (
        <div className="board">
            <section className="board-main">
                <div className="panel composer">
                    <h3>투자 복기 작성</h3>
                    <form onSubmit={submit}>
                        <div className="field">
                            <label>제목</label>
                            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 목표가 근처에서의 심리" />
                        </div>
                        <div className="field">
                            <label>기분/태도</label>
                            <select className="select" value={mood} onChange={(e) => setMood(e.target.value)}>
                                <option value="neutral">중립</option>
                                <option value="reflect">반성</option>
                                <option value="discipline">규율</option>
                                <option value="happy">만족</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>내용 <span className="kbd">{remaining}</span></label>
                            <textarea maxLength={500} className="textarea" value={body} onChange={(e) => setBody(e.target.value)} placeholder="오늘의 거래에서 배운 점, 실수, 다음 액션을 적어보세요." />
                        </div>
                        <div className="actions">
                            <button className="btn" type="submit">등록</button>
                            <span style={{ color: "var(--muted)" }}>Shift + Enter 줄바꿈</span>
                        </div>
                    </form>
                </div>

                {posts.map((p) => (
                    <article key={p.id} className="panel post">
                        <div className="post-title">{p.title}</div>
                        <div className="post-meta">{new Date(p.createdAt).toLocaleString()} · {p.mood}</div>
                        <div className="post-body">{p.body}</div>
                        <div className="actions" style={{ marginTop: 10 }}>
                            <button className="btn ghost" onClick={() => remove(p.id)}>삭제</button>
                        </div>
                    </article>
                ))}
            </section>

            <aside className="board-side">
                <div className="panel card">
                    <h3 style={{ marginTop: 0 }}>리뷰 가이드</h3>
                    <ul className="list">
                        <li>사전 계획 vs 실제 실행 비교</li>
                        <li>감정(두려움/탐욕)이 개입된 순간</li>
                        <li>다음 거래에서 바꿀 1가지</li>
                    </ul>
                </div>
                <div className="panel card">
                    <h3 style={{ marginTop: 0 }}>빠른 링크</h3>
                    <ul className="list">
                        <li><a href="/trades">거래 기록</a></li>
                        <li><a href="/performance">성과 지표</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Reviews;



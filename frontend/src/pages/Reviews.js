import React, { useState, useMemo } from "react";
import '../styles/Reviews.css';

// 리뷰 데이터 구조: { id, profit, loss, targetPrice, stopLossPrice, reason, createdAt }
function Reviews() {
    const [form, setForm] = useState({
        profit: '',
        loss: '',
        targetPrice: '',
        stopLossPrice: '',
        reason: '',
    });
    const [editId, setEditId] = useState(null);
    const [posts, setPosts] = useState(() => {
        try {
            const raw = localStorage.getItem("review-posts");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    // 폼 입력 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    // 등록/수정
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.profit || !form.loss || !form.targetPrice || !form.stopLossPrice || !form.reason.trim()) return;
        if (editId) {
            // 수정
            const next = posts.map(p => p.id === editId ? { ...p, ...form } : p);
            setPosts(next);
            localStorage.setItem("review-posts", JSON.stringify(next));
            setEditId(null);
        } else {
            // 등록
            const newPost = {
                id: Date.now(),
                profit: Number(form.profit),
                loss: Number(form.loss),
                targetPrice: Number(form.targetPrice),
                stopLossPrice: Number(form.stopLossPrice),
                reason: form.reason.trim(),
                createdAt: new Date().toISOString(),
            };
            const next = [newPost, ...posts];
            setPosts(next);
            localStorage.setItem("review-posts", JSON.stringify(next));
        }
        setForm({ profit: '', loss: '', targetPrice: '', stopLossPrice: '', reason: '' });
    };
    // 삭제
    const handleDelete = (id) => {
        const next = posts.filter(p => p.id !== id);
        setPosts(next);
        localStorage.setItem("review-posts", JSON.stringify(next));
        if (editId === id) setEditId(null);
    };
    // 수정 모드 진입
    const handleEdit = (post) => {
        setForm({
            profit: post.profit,
            loss: post.loss,
            targetPrice: post.targetPrice,
            stopLossPrice: post.stopLossPrice,
            reason: post.reason,
        });
        setEditId(post.id);
    };
    // 취소
    const handleCancel = () => {
        setForm({ profit: '', loss: '', targetPrice: '', stopLossPrice: '', reason: '' });
        setEditId(null);
    };
    return (
        <div className="reviews-board">
            <section className="reviews-main">
                <div className="panel reviews-composer">
                    <h3>투자 리뷰 {editId ? '수정' : '작성'}</h3>
                    <form className="reviews-form" onSubmit={handleSubmit}>
                        <div className="reviews-field">
                            <label>수익</label>
                            <input name="profit" type="number" className="reviews-input" value={form.profit} onChange={handleChange} placeholder="수익(숫자)" />
                        </div>
                        <div className="reviews-field">
                            <label>손절</label>
                            <input name="loss" type="number" className="reviews-input" value={form.loss} onChange={handleChange} placeholder="손절(숫자)" />
                        </div>
                        <div className="reviews-field">
                            <label>목표가</label>
                            <input name="targetPrice" type="number" className="reviews-input" value={form.targetPrice} onChange={handleChange} placeholder="목표가(숫자)" />
                        </div>
                        <div className="reviews-field">
                            <label>손절가</label>
                            <input name="stopLossPrice" type="number" className="reviews-input" value={form.stopLossPrice} onChange={handleChange} placeholder="손절가(숫자)" />
                        </div>
                        <div className="reviews-field">
                            <label>이렇게 생각한 이유</label>
                            <textarea name="reason" className="reviews-textarea" value={form.reason} onChange={handleChange} placeholder="이렇게 생각한 이유를 적어주세요." />
                        </div>
                        <div className="reviews-actions">
                            <button className="reviews-btn" type="submit">{editId ? '수정 완료' : '등록'}</button>
                            {editId && <button type="button" className="reviews-btn" onClick={handleCancel}>취소</button>}
                        </div>
                    </form>
                </div>
                <div className="panel reviews-list">
                    <h3>리뷰 목록</h3>
                    <table className="reviews-table">
                        <thead>
                            <tr>
                                <th>등록일</th>
                                <th>수익</th>
                                <th>손절</th>
                                <th>목표가</th>
                                <th>손절가</th>
                                <th>이유</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 && <tr><td colSpan={7} style={{textAlign:'center'}}>등록된 리뷰가 없습니다.</td></tr>}
                            {posts.map((p) => (
                                <tr key={p.id}>
                                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                                    <td>{p.profit}</td>
                                    <td>{p.loss}</td>
                                    <td>{p.targetPrice}</td>
                                    <td>{p.stopLossPrice}</td>
                                    <td style={{maxWidth:180,wordBreak:'break-all'}}>{p.reason}</td>
                                    <td>
                                        <button className="reviews-edit-btn" onClick={() => handleEdit(p)}>수정</button>
                                        <button className="reviews-delete-btn" onClick={() => handleDelete(p.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Reviews;



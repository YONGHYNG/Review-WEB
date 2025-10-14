// Shared dummy card data used by Home and CardDetail
const randomBetween = (min, max) => Math.round(min + Math.random() * (max - min));

export const cards = Array.from({ length: 30 }, (_, i) => {
  const id = i + 1;
  const entryPrice = randomBetween(10000, 50000);
  const investment = randomBetween(100000, 2000000);
  const isWin = i % 2 === 0;
  const pct = randomBetween(5, 30) / 100;
  const targetPrice = Math.round(entryPrice * (1 + (isWin ? pct : 0.1)));
  const stopPrice = Math.round(entryPrice * (isWin ? 0.98 : 0.9));
  const targetAmount = Math.round(investment * (isWin ? (0.1 + pct) : 0));
  const stopAmount = Math.round(investment * (isWin ? 0 : 0.05));

  return {
    id,
    result: isWin ? 'win' : 'lose',
    date: `2023-09-${(30 - i).toString().padStart(2, '0')}`,
    title: `거래 ${id}`,
    investment,
    entryPrice,
    targetPrice,
    targetAmount,
    stopPrice,
    stopAmount,
    review: `이 거래에 대한 간단한 리뷰입니다. 샘플 텍스트 ${id}`,
    images: [
      // small placeholder images: use data URLs or blanks; consumers can replace with real URLs
      `https://via.placeholder.com/600x300?text=Trade+${id}`
    ]
  };
});

export function getCardById(id) {
  return cards.find(c => c.id === Number(id));
}

export default cards;

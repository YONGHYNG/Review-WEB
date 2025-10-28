package list.reviews.cards.controller;

import list.reviews.cards.entity.Card;
import list.reviews.cards.service.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cards")
public class CardController {

    private static final Logger log = LoggerFactory.getLogger(CardController.class);
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public Object getAllCards() {
        List<Card> cards = cardService.getAllCards();

        if (cards == null || cards.isEmpty()) {
            log.warn("⚠️ 카드 데이터가 없습니다!");
            return "데이터 없음";  // ✅ 데이터가 없을 때 문자열 응답
        }

        log.info("✅ 클라이언트 요청에 응답할 카드 데이터 ({}건)", cards.size());
        for (Card card : cards) {
            log.info("📄 {}", card);
        }

        return cards;  // ✅ 데이터가 있으면 JSON 리스트 반환
    }
}

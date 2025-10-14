package list.reviews.cards.service;

import list.reviews.cards.entity.Card;
import list.reviews.cards.repository.CardRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // 전체 데이터 조회
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }
}



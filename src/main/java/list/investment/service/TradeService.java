package list.investment.service;

import list.investment.entity.Trade;
import list.investment.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Trade save(Trade trade) {
        return tradeRepository.save(trade);
    }

    public Optional<Trade> findById(Long id) {
        return tradeRepository.findById(id);
    }

    public List<Trade> findAll() {
        return tradeRepository.findAll();
    }
    public void delete(Long id) {
        tradeRepository.deleteById(id);
    }
}

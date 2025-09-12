package list.investment.service;

import list.investment.entity.Performance;
import list.investment.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PerformanceService {

    private final PerformanceRepository performanceRepository;

    public Performance save(Performance performance) {
        return performanceRepository.save(performance);
    }

    public Optional<Performance> findById(Long id) {
        return performanceRepository.findById(id);
    }

    public List<Performance> findAll() {
        return performanceRepository.findAll();
    }

    public void delete(Long id) {
        performanceRepository.deleteById(id);
    }
}

package list.investment.controller;

import list.investment.entity.Performance;
import list.investment.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance")
@RequiredArgsConstructor
public class PerformanceController {

    private final PerformanceService performanceService;

    @PostMapping
    public ResponseEntity<Performance> create(@RequestBody Performance performance){
        return ResponseEntity.ok(performanceService.save(performance));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Performance> getById(@PathVariable Long id) {
        return performanceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Performance> getAll(){
        return performanceService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        performanceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

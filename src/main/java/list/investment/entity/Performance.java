package list.investment.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "performance")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long performanceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate periodStart;
    private LocalDate periodEnd;

    @Column(nullable = false, precision = 18, scale = 4)
    private Double totalInvested;

    @Column(nullable = false, precision = 18, scale = 4)
    private Double totalReturn;

    @Column(nullable = false, precision = 6, scale = 2)
    private Double roi; // 수익률 %

    private LocalDateTime createdAt = LocalDateTime.now();
}

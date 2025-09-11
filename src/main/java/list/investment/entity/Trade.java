package list.investment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long tradeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 20)
    private String symbol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TradeType tradeType;

    @Column(nullable = false, precision = 18, scale = 4)
    private Double quantity;

    @Column(nullabe = false, precision = 18, scale = 4)
    private Double price;

    @Column(nullable = false)
    private LocalDate tradeDate;

    @Lob
    private String memo;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "trade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    public enum TradeType {
        buy, sell
    }

}

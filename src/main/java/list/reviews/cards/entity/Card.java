package list.reviews.cards.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cards")
@Getter
@Setter
@NoArgsConstructor
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trade_date", nullable = false)
    private String tradeDate;

    @Column(nullable = false)
    private String result; // WIN or LOSE

    @Column(name = "invest_amount", nullable = false)
    private int investAmount;

    @Column(name = "entry_price", nullable = false)
    private double entryPrice;

    @Column(name = "take_profit_price")
    private Double takeProfitPrice;

    @Column(name = "stop_loss_price")
    private Double stopLossPrice;

    @Column(name = "profit_amount")
    private Integer profitAmount;

    @Column(name = "loss_amount")
    private Integer lossAmount;

    @Column(length = 255)
    private String review;
}



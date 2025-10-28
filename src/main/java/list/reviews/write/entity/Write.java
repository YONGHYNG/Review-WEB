package list.reviews.write.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name ="cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Write {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trade_date")
    private LocalDate tradeDate;

    @Column(name = "trade_no")
    private Integer tradeNo;

    @Column(name = "result", length = 10)
    private String result;

    @Column(name = "invest_amount", nullable = false)
    private Double investAmount;

    @Column(name = "entry_price", nullable = false)
    private Double entryPrice;

    @Column(name = "take_profit_price")
    private Double takeProfitPrice;

    @Column(name = "stop_loss_price")
    private Double stopLossPrice;

    @Column(name = "profit_amount")
    private Double profitAmount;

    @Column(name = "loss_amount")
    private Double lossAmount;

    @Column(length = 500, nullable = false)
    private String review;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_type")
    private String imageType;

}

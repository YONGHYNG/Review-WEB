package list.reviews.write.service;

import list.reviews.write.entity.Write;
import list.reviews.write.repository.WriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WriteService {

    private final WriteRepository writeRepository;

    public Write saveWrite(Double investAmount, Double entryPrice, Double profitAmount,
                           String review, MultipartFile image) throws IOException {
        byte[] imageData =null;
        String imageName = null;
        String imageType = null;

        if(image != null && !image.isEmpty()) {
            imageData = image.getBytes();
            imageName = image.getOriginalFilename();
            imageType = image.getContentType();
        }

        //trade_date, trade_no, result, Loss_amount 등은 예시 값으로 처리
        //프론트에서 확장 시 해당 값도 함께 받음
        Write write = Write.builder()
                .tradeDate(LocalDate.now())
                .tradeNo(null)
                .result(null)
                .investAmount(investAmount)
                .entryPrice(entryPrice)
                .takeProfitPrice(null)
                .stopLossPrice(null)
                .profitAmount(profitAmount)
                .lossAmount(null)
                .review(review)
                .imageData(imageData)
                .imageName(imageName)
                .imageType(imageType)
                .build();

        return writeRepository.save(write);
    }

    //이미지 조회용
    public Write getWrite(Long id) {
        return writeRepository.findById(id).orElse(null);
    }
}

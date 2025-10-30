package list.reviews.write.controller;

import list.reviews.write.entity.Write;
import list.reviews.write.service.WriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // react 개발 서버 허용
public class WriteController {

    private final WriteService writeService;

    // 게시글 등록 API
    @PostMapping
    public ResponseEntity<?> createCard(
            @RequestParam("result") String result,
            @RequestParam("investAmount") Double investAmount,
            @RequestParam("entryPrice") Double entryPrice,
            @RequestParam(value = "profitAmount", required = false) Double profitAmount,
            @RequestParam("review") String review,
            @RequestParam(value = "images", required = false) MultipartFile image
    ) {
        try {            Write saved = writeService.saveWrite(result, investAmount, entryPrice, profitAmount, review, image);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 저장 중 오류: " + e.getMessage());
        }
    }

    // ✅ 이미지 조회 API (React에서 표시 가능)
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Write write = writeService.getWrite(id);
        if (write == null || write.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(write.getImageType()));
        headers.setContentDisposition(ContentDisposition.inline().filename(write.getImageName()).build());

        return new ResponseEntity<>(write.getImageData(), headers, HttpStatus.OK);
    }
}

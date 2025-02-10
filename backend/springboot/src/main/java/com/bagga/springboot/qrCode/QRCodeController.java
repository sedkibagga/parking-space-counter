package com.bagga.springboot.qrCode;

import com.google.zxing.WriterException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class QRCodeController {

    @GetMapping(value = "/qrcode", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateQRCode(@RequestParam String text) {
        try {
            byte[] qrCode = QRCodeGenerator.generateQRCodeImage(text, 200, 200);
            return ResponseEntity.ok().body(qrCode);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
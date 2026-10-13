package org.divineconnect.temple.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Service
public class SmsService {

    @Value("${sms.fast2sms.api-key:}")
    private String fast2smsApiKey;

    private volatile String runtimeApiKey = null;

    private final HttpClient httpClient;

    public SmsService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * Sends a real OTP directly to the devotee's physical mobile number via Fast2SMS
     *
     * @param rawPhone     Devotee mobile number (with or without +91)
     * @param otp          6-digit generated verification code
     * @param customApiKey Optional API key passed from request/settings
     * @return true if successfully accepted by telecom carrier
     */
    public boolean sendRealOtp(String rawPhone, String otp, String customApiKey) {
        String digitsOnly = rawPhone.replaceAll("[^0-9]", "");
        // Extract 10-digit Indian mobile number
        String mobileNumber = digitsOnly.length() >= 10 
                ? digitsOnly.substring(digitsOnly.length() - 10) 
                : digitsOnly;

        String apiKey = resolveApiKey(customApiKey);

        System.out.println("=================================================");
        System.out.println("📱 [REAL SMS GATEWAY - FAST2SMS]");
        System.out.println("Target Mobile : +91 " + mobileNumber);
        System.out.println("Generated OTP : " + otp);

        if (apiKey == null || apiKey.trim().isEmpty()) {
            System.out.println("⚠️  STATUS: No Fast2SMS API Key configured.");
            System.out.println("👉 Add your Fast2SMS API key in application.properties, FAST2SMS_API_KEY env, or UI settings.");
            System.out.println("=================================================");
            return false;
        }

        try {
            // Fast2SMS Quick OTP Gateway Endpoint (POST JSON)
            String jsonPayload = String.format(
                    "{\"route\":\"otp\",\"variables_values\":\"%s\",\"numbers\":\"%s\"}",
                    otp, mobileNumber
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.fast2sms.com/dev/bulkV2"))
                    .header("authorization", apiKey)
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Fast2SMS Response Code: " + response.statusCode());
            System.out.println("Fast2SMS Body         : " + response.body());

            if (response.statusCode() == 200 && response.body().contains("\"return\":true")) {
                System.out.println("✅ REAL SMS DELIVERED TO CARRIER FOR +91 " + mobileNumber + "!");
                System.out.println("=================================================");
                // Cache this working key
                this.runtimeApiKey = apiKey;
                return true;
            } else {
                // Fallback attempt via GET route if POST had unexpected carrier response
                System.out.println("Attempting Fast2SMS GET fallback...");
                String getUrl = String.format(
                        "https://www.fast2sms.com/dev/bulkV2?authorization=%s&route=otp&variables_values=%s&flash=0&numbers=%s",
                        URLEncoder.encode(apiKey, StandardCharsets.UTF_8),
                        otp,
                        mobileNumber
                );
                HttpRequest getRequest = HttpRequest.newBuilder()
                        .uri(URI.create(getUrl))
                        .timeout(Duration.ofSeconds(15))
                        .GET()
                        .build();

                HttpResponse<String> getResponse = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());
                System.out.println("Fast2SMS GET Status: " + getResponse.statusCode() + " | Body: " + getResponse.body());
                System.out.println("=================================================");
                boolean ok = getResponse.statusCode() == 200 && getResponse.body().contains("\"return\":true");
                if (ok) this.runtimeApiKey = apiKey;
                return ok;
            }
        } catch (Exception ex) {
            System.err.println("❌ Failed to transmit real SMS via Fast2SMS: " + ex.getMessage());
            System.out.println("=================================================");
            return false;
        }
    }

    public boolean sendRealOtp(String rawPhone, String otp) {
        return sendRealOtp(rawPhone, otp, null);
    }

    public boolean isConfigured(String customApiKey) {
        String key = resolveApiKey(customApiKey);
        return key != null && !key.trim().isEmpty();
    }

    private String resolveApiKey(String customApiKey) {
        if (customApiKey != null && !customApiKey.trim().isEmpty()) {
            return customApiKey.trim();
        }
        if (runtimeApiKey != null && !runtimeApiKey.trim().isEmpty()) {
            return runtimeApiKey.trim();
        }
        if (fast2smsApiKey != null && !fast2smsApiKey.trim().isEmpty()) {
            return fast2smsApiKey.trim();
        }
        return System.getenv("FAST2SMS_API_KEY");
    }
}

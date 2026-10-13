package org.divineconnect.temple.dto;

public class OtpRequest {
    private String phone;
    private String apiKey;

    public OtpRequest() {}

    public OtpRequest(String phone) {
        this.phone = phone;
    }

    public OtpRequest(String phone, String apiKey) {
        this.phone = phone;
        this.apiKey = apiKey;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
}

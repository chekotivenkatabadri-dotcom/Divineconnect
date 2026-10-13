package org.divineconnect.temple.dto;

public class VerifyOtpRequest {
    private String phone;
    private String otp;
    private String name;
    private String gotra;

    public VerifyOtpRequest() {}

    public VerifyOtpRequest(String phone, String otp, String name, String gotra) {
        this.phone = phone;
        this.otp = otp;
        this.name = name;
        this.gotra = gotra;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGotra() {
        return gotra;
    }

    public void setGotra(String gotra) {
        this.gotra = gotra;
    }
}

package org.divineconnect.temple.dto;

public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
    private String devoteeName;
    private String role;

    public AuthResponse() {}

    public AuthResponse(boolean success, String message, String token, String devoteeName, String role) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.devoteeName = devoteeName;
        this.role = role;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getDevoteeName() { return devoteeName; }
    public void setDevoteeName(String devoteeName) { this.devoteeName = devoteeName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

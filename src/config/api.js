export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-domain.com"
    : "http://localhost:5000";

export const API_ENDPOINTS = {
  UPLOAD_IMAGES: (productId) =>
    `${API_BASE_URL}/api/product-images/upload/${productId}`,
  DELETE_IMAGES: `${API_BASE_URL}/api/product-images/delete`,
  HEALTH_CHECK: `${API_BASE_URL}/api/product-images/health`,
  SEND_OTP: `${API_BASE_URL}/api/email/send-otp`,
  SEND_APPROVAL: `${API_BASE_URL}/api/email/send-approval`,
};

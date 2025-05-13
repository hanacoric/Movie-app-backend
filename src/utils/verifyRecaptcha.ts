import axios from "axios";

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  // Bypass reCAPTCHA in development or test environments
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return true;
  }

  try {
    const secret = process.env.VITE_RECAPTCHA_SECRET_KEY!;
    const response = await axios.post<{ success: boolean }>(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    return response.data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
};

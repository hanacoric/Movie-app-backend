import axios from "axios";

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
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
    console.log("🔍 reCAPTCHA verify response:", response.data);

    return response.data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
};

import liff from "@line/liff";

const liffId = import.meta.env.VITE_LIFF_ID || "";

export async function initLiff() {
  if (!liffId) {
    console.warn("VITE_LIFF_ID is not set. LIFF functionality will be limited.");
    return null;
  }
  
  try {
    await liff.init({ liffId });
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    return liff;
  } catch (error) {
    console.error("LIFF initialization failed", error);
    return null;
  }
}

export const getProfile = async () => {
  try {
    if (liff.isLoggedIn()) {
      return await liff.getProfile();
    }
  } catch (error) {
    console.error("Error getting profile", error);
  }
  return null;
};

import { Middleware } from "redux";

export const notificationMiddleware: Middleware<{}, any, any> =
  (store) => (next) => (action: any) => {
    const status = action.payload?.status;
    if (status === 400) {
      console.log(`HTTP Status: ${status}`);
      alert("HTTP 400 GELDİ");
    }
    return next(action);
  };

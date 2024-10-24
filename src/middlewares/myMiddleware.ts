import { toast } from "react-toastify";
import { Middleware } from "redux";

export const notificationMiddleware: Middleware<{}, any, any> =
  () => (next) => (action: any) => {
    const status = action.payload?.status;
    if (status === 400) {
      console.log(`HTTP Status: ${status}`);
      toast.success("HTTP 400 GELDİ");
    }
    return next(action);
  };

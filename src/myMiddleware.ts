import { toast } from "react-toastify";
import { Middleware } from "redux";

export const notificationMiddleware: Middleware<{}, any, any> =
  (store) => (next) => (action: any) => {
    const status = action.payload?.status;
    if (status === 200) {
      console.log(`HTTP Status: ${status}`);
      toast.success("HTTP 200 GELDİ");
    }
    return next(action);
  };

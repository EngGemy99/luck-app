import userRoute from "./user/userRoute.js";
import adminRoute from "./admin/adminRoute.js";
import authRoute from "./auth/authRoute.js";
import requestRoute from "./request/requestRoute.js";
import paymentRoute from "./payment/paymentRoute.js";
import videoRoute from "./video/videoRoute.js";
import offersRoute from "./offers/offersRoute.js";
import wanndsRoute from "./wannds/wanndsRoute.js";
import tabJoyRoute from "./tabjoy/tabJoyRoute.js";
import irounSourceRoute from "./irounSource/irounSourceRoute.js";
import { ErrorMessage } from "../utils/ErrorMessage.js";

export function allRoutes(app) {
  app.use(authRoute);
  app.use("/user", userRoute);
  app.use("/admin", adminRoute);
  app.use("/request", requestRoute);
  app.use("/payment", paymentRoute);
  app.use("/video", videoRoute);
  app.use("/offers", offersRoute);
  app.use("/tab-joy", tabJoyRoute);
  app.use("/iroun-source", irounSourceRoute);
  app.use("/wannds", wanndsRoute);

  //! Not Found Page
  app.use((request, response, next) => {
    next(ErrorMessage(404, `Not found - ${request.originalUrl}`));
  });

  //! to catch any error
  app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
      error: error.message,
      statusError: error.status,
    });
  });
}

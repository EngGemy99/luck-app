import { tabJoyModel } from "../../../models/TabJoy.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

export const getAll = catchError(async (request, response, next) => {
  let tabJoy = await tabJoyModel.find();
  response.status(200).json({
    tabJoy,
  });
});
export const addWannds = catchError(async (request, response, next) => {
  await tabJoyModel.create(request.body);
  response.status(200).json({
    message: "Added Successfully",
    status: 200,
  });
});

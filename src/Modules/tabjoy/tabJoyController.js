import { tabJoyModel } from "../../../models/TabJoy.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

export const getAll = catchError(async (request, response, next) => {
  let tabJoy = await tabJoyModel.find();
  response.status(200).json({
    tabJoy,
    status: 200,
  });
});
export const addToyJoy = catchError(async (request, response, next) => {
  await tabJoyModel.create(request.body);
  response.status(201).json({
    message: "Added Successfully",
    status: 201,
  });
});

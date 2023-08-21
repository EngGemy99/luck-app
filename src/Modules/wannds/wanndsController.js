import { wanndsModel } from "../../../models/Wannds.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

export const getAll = catchError(async (request, response, next) => {
  let wannds = await wanndsModel.find();
  response.status(200).json({
    wannds,
    status: 200,
  });
});
export const addWannds = catchError(async (request, response, next) => {
  await wanndsModel.create(request.body);
  response.status(201).json({
    message: "Added Successfully",
    status: 201,
  });
});

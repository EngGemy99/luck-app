import { irounSourceModel } from "../../../models/irounSource.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

export const getAll = catchError(async (request, response, next) => {
  let irounSource = await irounSourceModel.find();
  response.status(200).json({
    irounSource,
    status: 200,
  });
});
export const addIrounSource = catchError(async (request, response, next) => {
  await irounSourceModel.create(request.body);
  response.status(201).json({
    message: "Added Successfully",
    status: 201,
  });
});

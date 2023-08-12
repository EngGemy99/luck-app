import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import cloudinary from "../../utils/cloudinary.js";
import { paymentModel } from "../../../models/Payment.js";

export const getAllPayment = catchError(async (request, response, next) => {
  let paymentWays = await paymentModel.find();
  response.status(200).json({
    paymentWays,
  });
});
export const addPaymentWay = catchError(async (request, response, next) => {
  const { paymentName } = request.body;
  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Luke-App/Payment-Images" }
  );
  let isFound = await paymentModel.findOne({ paymentName });
  if (isFound) return next(ErrorMessage(409, `it is already exists`));

  let result = await paymentModel.create({
    paymentName,
    image: { public_id, secure_url },
  });

  response.status(200).json({
    message: "Done",
    result,
  });
});

export const updatePaymentWay = catchError(async (request, response, next) => {
  const { paymentName, status } = request.body;
  const { id } = request.params;
  let paymentWay = await paymentModel.findById(id);
  if (!paymentWay) {
    return next(ErrorMessage(404, "Payment way not found"));
  }
  // Update the payment name if one was provided
  if (paymentName) {
    let isFound = await paymentModel.findOne({ paymentName });
    if (isFound) {
      return next(
        ErrorMessage(409, `Payment way with this name already exists`)
      );
    }
    paymentWay.paymentName = paymentName;
  }
  if (status) {
    paymentWay.status = status;
  }
  if (request.file) {
    console.log(paymentWay.image.public_id);
    await cloudinary.uploader.destroy(paymentWay.image.public_id);
    let { public_id, secure_url } = await cloudinary.uploader.upload(
      request.file.path,
      {
        folder: "Luke-App/Payment-Images",
      }
    );
    paymentWay.image = { public_id, secure_url };
  }
  await paymentWay.save();
  response.status(200).json({
    message: "Payment way updated successfully",
    result: paymentWay,
  });
});

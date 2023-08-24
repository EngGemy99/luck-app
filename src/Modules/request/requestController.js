import { requestModel } from "../../../models/Request.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { userModel } from "../../../models/User.js";

export const withdrawalRequest = catchError(async (request, response, next) => {
  request.body.user = request.user._id;
  const { countPoint } = request.body;
  if (countPoint > request.user.points) {
    return next(ErrorMessage(404, "You Do Not Have Enough Point"));
  }
  //! rival point for user in rejected or accepted
  let user = await userModel.findById(request.user._id);
  user.points -= countPoint;
  await user.save();
  let newRequest = await requestModel.create(request.body);
  response.status(200).json({
    message: "waiting for admin approval",
    newRequest,
    status: 200,
  });
});
export const allRequest = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(
    requestModel.find().populate({
      path: "user",
      select: "userName email",
    }),
    request.query
  ).filter();
  //? execute query
  let requests = await apiFeature.mongooseQuery;
  response.status(200).json({
    requests,
    status: 200,
  });
});

export const acceptedOrCancelRequest = catchError(
  async (request, response, next) => {
    let { id } = request.params;
    let updateRequest = await requestModel.findByIdAndUpdate(
      id,
      {
        status: request.body.status,
      },
      { new: true }
    );
    response.status(200).json({
      message: "request updated successfully",
      updateRequest,
      status: 200,
    });
  }
);

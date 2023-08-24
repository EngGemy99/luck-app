import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "../../../models/User.js";
import cloudinary from "../../utils/cloudinary.js";
import { payoutModel } from "../../../models/Payout.js";

export const profile = catchError(async (request, response, next) => {
  let { _id } = request.user;
  let userProfile = await userModel.findById(_id);
  if (!userProfile) {
    return next(ErrorMessage(404, `Not Found`));
  }
  response.status(200).json({
    userProfile,
    status: 200,
  });
});

export const editProfilePic = catchError(async (request, response, next) => {
  let { _id } = request.user;

  let user = await userModel.findById(_id);
  if (!user) return next(ErrorMessage(404, `Not Found`));

  if (user.profilePic.public_id != "") {
    await cloudinary.uploader.destroy(user.profilePic.public_id);
  }

  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Luke-App/Profile-Images" }
  );
  let result = await userModel.findByIdAndUpdate(
    _id,
    {
      profilePic: { public_id, secure_url },
    },
    { new: true }
  );
  response.status(200).json({
    message: "Done",
    result,
    status: 200,
  });
});

export const forgotPassword = catchError(async (request, response, next) => {
  const { email } = request.body;
  let isFound = await userModel.findOne({ email });
  if (!isFound) {
    return next(ErrorMessage(404, `user with this email not found`));
  }
  response.status(200).json({
    message: "User exists",
    status: 200,
  });
});
export const resetPassword = catchError(async (request, response, next) => {
  const { email, password } = request.body;
  let user = await userModel.findOne({ email });
  user.password = password;
  await user.save();
  response.status(200).json({
    message: "password updated successfully",
    user,
    status: 200,
  });
});

export const getUser = catchError(async (request, response, next) => {
  const { id } = request.params;
  let user = await userModel.findById(id);
  if (!user) return next(ErrorMessage(404, `Not Found`));
  response.status(200).json({
    user,
    status: 200,
  });
});

export const watchOffers = catchError(async (request, response, next) => {
  const { user_id, amount, payout } = request.query;
  let user = await userModel.findByIdAndUpdate(
    user_id,
    {
      $inc: {
        points: Number(amount),
      },
    },
    { new: true }
  );
  if (!user) return next(ErrorMessage(404, `Not Found`));
  await payoutModel.create({
    user: user_id,
    money: payout,
  });
  response.status(200).json({
    message: "Earn Point successfully",
    user,
    status: 200,
  });
});

// ! for testing
// export const watchOffers = catchError(async (request, response, next) => {
//   const { user_id, amount, payout } = request.query;
//   let user = await userModel.findByIdAndUpdate(
//     user_id,
//     {
//       $inc: {
//         points: Number(amount),
//         payout: Number(payout),
//       },
//     },
//     { new: true }
//   );
//   if (!user) return next(ErrorMessage(404, `Not Found`));
//   if (user.points < 0) {
//     user = await userModel.findByIdAndUpdate(
//       user_id,
//       { points: 0 },
//       { new: true }
//     );
//   }
//   response.status(200).json({
//     message: "Earn Point successfully",
//     user,
//     status: 200,
//   });
// });

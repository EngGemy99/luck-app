import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/User.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";

export const register = catchError(async (request, response, next) => {
  let isFound = await userModel.findOne({
    $or: [{ email: request.body.email }, { username: request.body.userName }],
  });
  console.log(isFound);
  if (isFound)
    return next(ErrorMessage(409, " email or userName already exists"));

  let user = await userModel.create(request.body);
  response.status(200).json({
    message: "Done 👌",
    user,
  });
});
export const login = catchError(async (request, response, next) => {
  const { userName, password } = request.body;
  let isFound = await userModel.findOne({ userName });

  if (isFound?.status == "blocked")
    return next(ErrorMessage(400, "you are not allowed to login "));

  const match = await bcrypt.compare(password, isFound ? isFound.password : "");
  if (isFound && match) {
    let token = jwt.sign(
      {
        userId: isFound._id,
        role: isFound.role,
      },
      process.env.SECRET_KEY
    );
    return response.status(200).json({
      message: "Done ",
      token,
    });
  }
  next(ErrorMessage(401, "Incorrect userName Or Password 🙄"));
});

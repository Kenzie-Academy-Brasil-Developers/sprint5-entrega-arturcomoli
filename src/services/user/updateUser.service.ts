import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import CustomError from "../../errors/CustomError";
import { FindUser, UpdateUser } from "../../interfaces/user";
import * as bcrypt from "bcryptjs";

const updateUserService = async (
  { id }: FindUser,
  { name, email, age, password }: UpdateUser
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new CustomError("User not found.", 400);
  }

  let newPassword;

  if (password?.length === 0) {
    throw new CustomError("Invalid password entry", 400);
  }

  if (password) {
    if (await bcrypt.compare(password as string, user.password as string)) {
      throw new CustomError(
        "New password must not be equal to old password",
        400
      );
    }
    newPassword = await bcrypt.hash(password as string, 8);
  }

  const updatedUser = {
    name,
    email,
    age,
    password: newPassword,
    updated_at: new Date(),
  };

  await userRepository.update(id, updatedUser);

  const returnUser = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  return returnUser;
};

export default updateUserService;

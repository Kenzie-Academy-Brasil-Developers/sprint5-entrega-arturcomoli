import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import CustomError from "../../errors/CustomError";
import { CreateUser, FindUser } from "../../interfaces/user";
import * as bcrypt from "bcryptjs";

const updateUserService = async (
  { id }: FindUser,
  { name, email, age, password }: CreateUser
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

  await userRepository.update(
    {
      id: id,
    },
    {
      name,
      email,
      age,
      password: await bcrypt.hash(password, 8),
      updated_at: new Date(),
    }
  );

  const updatedUser = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  return updatedUser;
};

export default updateUserService;

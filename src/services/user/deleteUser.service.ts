import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import CustomError from "../../errors/CustomError";
import { FindUser } from "../../interfaces/user";

const deleteUserService = async ({ id }: FindUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    throw new CustomError("User not found", 400);
  }

  await userRepository.delete({
    id: id,
  });

  return user;
};

export default deleteUserService;

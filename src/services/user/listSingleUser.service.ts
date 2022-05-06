import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import CustomError from "../../errors/CustomError";
import { FindUser } from "../../interfaces/user";

const listSingleUserService = async ({ id }: FindUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new CustomError("User not found.", 400);
  }

  return user;
};

export default listSingleUserService;

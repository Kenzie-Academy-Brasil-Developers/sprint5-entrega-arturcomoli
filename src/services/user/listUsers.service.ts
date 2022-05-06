import { AppDataSource } from "../../data-source";
import User from "../../entities/User";

const listUsersService = async () => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.find();
  return user;
};

export default listUsersService;

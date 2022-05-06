import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import { CreateUser, ReturnUserCreation } from "../../interfaces/user";
import * as bcrypt from "bcryptjs";

const createUserService = async ({
  name,
  email,
  password,
  age,
}: CreateUser): Promise<User> => {
  const userRepository = AppDataSource.manager.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw new Error("Email altready in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    age,
  });

  await userRepository.save(newUser);

  // const user =
  return newUser;
};

export default createUserService;

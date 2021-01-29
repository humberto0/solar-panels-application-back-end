import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

/*
 * Recebimento das informações
 * Tratativa de Erros/excessões
 * Acesso ao repositorio
 * */
interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

/*
 * dependency inversion(SOLID)
 * */

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const chekUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (chekUserExists) {
      throw new AppError('email address already exists', 401);
    }
    const hashPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;

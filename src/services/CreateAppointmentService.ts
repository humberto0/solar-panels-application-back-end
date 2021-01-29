import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/*
 * Recebimento das informações
 * Tratativa de Erros/excessões
 * Acesso ao repositorio
 * */
interface RequestDTO {
  address: string;
  name: string;
  email: string;
}

/*
 * dependency inversion(SOLID)
 * */

class CreateAppointmentService {
  public async execute({
    name,
    email,
    address,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointment = appointmentsRepository.create({
      name,
      email,
      address,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;

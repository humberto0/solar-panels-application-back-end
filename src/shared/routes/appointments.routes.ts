import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// receber uma requisição , chamar um outro serviços e devolver uma resposta
const appointmentsRouter = Router();
appointmentsRouter.get('/', ensureAuthenticated, async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});
appointmentsRouter.post('/', async (req, res) => {
  const { name, email, address } = req.body;
  const createAppointmennt = new CreateAppointmentService();
  const appointment = await createAppointmennt.execute({
    name,
    email,
    address,
  });
  return res.json(appointment);
});
export default appointmentsRouter;

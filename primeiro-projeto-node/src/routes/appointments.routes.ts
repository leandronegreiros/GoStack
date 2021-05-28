import { request, response, Router } from 'express';
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentservice from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.status(200).json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedate = parseISO(date);
       
        const creatAppointment = new CreateAppointmentservice(
            appointmentsRepository
        );
    
        const appointment = creatAppointment.execute({
            date: parsedate, provider
        });
    
        return response.status(201).json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
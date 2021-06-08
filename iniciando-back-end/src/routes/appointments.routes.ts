import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentservice from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedate = parseISO(date);


        const creatAppointment = new CreateAppointmentservice();

        const appointment = await creatAppointment.execute({
            date: parsedate,
            provider_id
        });

        return response.status(201).json(appointment);
    } catch (err) {
        console.log( err.message);
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;

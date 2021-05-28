import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from 'date-fns'

interface Request {
    provider: string,
    date: Date
}

class CreateAppointmentservice {

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmantsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmantsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentsDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentsDate
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentsDate
        });

        return appointment;
    }
}

export default CreateAppointmentservice;
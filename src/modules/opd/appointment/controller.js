import Appointment from "./model.js";

/**
 * CREATE Appointment
 */
export const createAppointment = async (req, res) => {
  const { uhid, department, consultant, appointmentDate, slot } = req.body;

  if ( !department || !consultant || !appointmentDate || !slot) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const appointment = await Appointment.create({
    uhid,
    department,
    consultant,
    appointmentDate,
    slot,
  });

  res.status(201).json({
    message: "Appointment created successfully",
    data: appointment,
  });
};

/**
 * GET Appointments by Doctor & Date
 * (used for OPD / daily list)
 */
export const getAppointmentsByDoctorAndDate = async (req, res) => {
  const { consultant, date } = req.query;

  if (!consultant || !date) {
    return res.status(400).json({
      message: "Consultant and date are required",
    });
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    consultant,
    appointmentDate: { $gte: start, $lte: end },
  })
    .populate("uhid", "uhidNumber patientName")
    .populate("consultant", "firstName lastName employeeCode")
    .populate("department", "departmentName")
    .sort({ slot: 1 });

  res.status(200).json(appointments);
};

/**
 * GET ALL Appointments (Admin / reports)
 */
export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("uhid", "uhid fname mname lname")
    .populate("consultant", "firstName lastName employeeCode")
    .populate("department", "departmentName")
    .sort({ appointmentDate: -1, slot: 1 });

  res.status(200).json(appointments);
};

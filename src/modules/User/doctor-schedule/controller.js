import DoctorSchedule from "./model.js";

/**
 * CREATE / UPDATE Doctor Schedule
 * One schedule per doctor (upsert)
 */
export const createDoctorSchedule = async (req, res) => {
  const { doctor, days } = req.body;

  if (!doctor) {
    return res.status(400).json({ message: "Doctor is required" });
  }

  if (!Array.isArray(days) || days.length === 0) {
    return res.status(400).json({ message: "Days are required" });
  }

  // minimal structural validation
  for (const day of days) {
    if (!day.date || !Array.isArray(day.slots)) {
      return res.status(400).json({ message: "Invalid day structure" });
    }
  }

  const schedule = await DoctorSchedule.findOneAndUpdate(
    { doctor },
    { doctor, days },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  res.status(200).json({
    message: "Doctor schedule saved successfully",
    data: schedule,
  });
};

/**
 * GET Doctor Schedule (by doctorId)
 */
export const getDocterSchedule = async (req, res) => {
  const { doctorId } = req.params;

  const schedule = await DoctorSchedule.findOne({ doctor: doctorId }).populate(
    "doctor",
    "firstName lastName employeeCode"
  );

  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  res.status(200).json(schedule);
};

/**
 * GET ALL Doctors Schedules
 */
export const getAllDoctorsSchedule = async (req, res) => {
  const schedules = await DoctorSchedule.find()
    .populate("doctor", "firstName lastName employeeCode")
    .sort({ createdAt: -1 });

  res.status(200).json(schedules);
};

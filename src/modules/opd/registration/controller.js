import OPDPatient from "./model.js";
import { generateOpdNo } from "../../../utils/generateOpdNo.js";
import UHID from "../../UHID/model.js";
import {
  softDeleteAppointment,
  softDeleteAppointmentById,
} from "../appointment/controller.js";
import { createOpdEmr } from "../opd-emr/controller.js";

/* -------------------------------- CREATE OPD -------------------------------- */
export const createOpdPatient = async (req, res) => {
  try {
    const { patient, appointment, category, parentPayee, payee } = req.body;

    if (!patient || !appointment || !category) {
      return res.status(400).json({
        success: false,
        message: "Patient, Appointment and Category are required",
      });
    }

    const opdno = await generateOpdNo();

    const opdPatient = await OPDPatient.create({
      patient,
      appointment,
      opdno,
      category,
      parentPayee: parentPayee || null,
      payee: payee || null,
    });

    await createOpdEmr({
      patientId: patient,
      opdId: opdPatient._id,
      opdNo: opdno,
    });

    await softDeleteAppointmentById(appointment);

    res.status(201).json({
      success: true,
      message: "OPD patient created",
      data: opdPatient,
    });
  } catch (err) {
    console.error("createOpdPatient error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

/* ----------------------------- MARK ARRIVED (wait → in) ----------------------------- */
export const markOpdIn = async (req, res) => {
  try {
    const { id } = req.params;

    const opd = await OPDPatient.findByIdAndUpdate(
      id,
      {
        status: "in",
        inTime: new Date(),
      },
      { new: true },
    );

    if (!opd) {
      return res.status(404).json({
        success: false,
        message: "OPD patient not found",
      });
    }

    res.json({
      success: true,
      message: "Patient marked as arrived",
      data: opd,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ----------------------------- MARK OUT (in → out) ----------------------------- */
export const markOpdOut = async (req, res) => {
  try {
    const { id } = req.params;

    const opd = await OPDPatient.findByIdAndUpdate(
      id,
      {
        status: "out",
        outTime: new Date(),
      },
      { new: true },
    );

    if (!opd) {
      return res.status(404).json({
        success: false,
        message: "OPD patient not found",
      });
    }

    res.json({
      success: true,
      message: "Patient marked as out",
      data: opd,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------- GET OPD LIST -------------------------------- */
export const getAllOpdPatients = async (req, res) => {
  try {
    const data = await OPDPatient.find()
      .populate("patient")
      .populate({
        path: "appointment",
        populate: [
          { path: "consultant", select: "firstName lastName" },
          { path: "department", select: "departmentName" },
        ],
      })
      .populate("category", "name")
      // .populate("parentPayee", "name")
      // .populate("payee", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ----------------------------- FIND SINGLE OPD ----------------------------- */
export const getOpdById = async (req, res) => {
  try {
    const opd = await OPDPatient.findById(req.params.id)
      .populate("patient")
      .populate("appointment")
      .populate("category")
      .populate("parentPayee")
      .populate("payee");

    if (!opd) {
      return res.status(404).json({
        success: false,
        message: "OPD patient not found",
      });
    }

    res.json({ success: true, data: opd });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchOpdPatients = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const regex = new RegExp(q, "i");

    // 1️⃣ Search UHID collection
    const uhidPatients = await UHID.find({
      $or: [
        { fname: regex },
        { lname: regex },
        { uhid: regex },
        { mobileNumber: regex },
      ],
    }).select("_id");

    const uhidIds = uhidPatients.map((p) => p._id);

    // console.log("🆔 MATCHED UHID IDS:", uhidIds.length);

    // 2️⃣ Search OPD using those UHID ids OR opdno
    const opdPatients = await OPDPatient.find({
      $or: [{ opdno: regex }, { patient: { $in: uhidIds } }],
    })
      .populate("patient", "fname lname uhid mobileNumber")
      .populate({
        path: "appointment",
        populate: { path: "consultant", select: "firstName lastName" },
      })
      .limit(10)
      .sort({ createdAt: -1 });

    // console.log("📦 OPD RESULTS:", opdPatients.length);

    res.json(opdPatients);
  } catch (err) {
    console.error("OPD SEARCH ERROR:", err);
    res.status(500).json([]);
  }
};

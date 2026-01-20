// uhid/controller.js
import { generateUHID } from "./counter/controller.js";
import UHID from "./model.js";

/**
 * Create UHID (Patient Registration)
 */
export const createUHID = async (req, res) => {
  try {
    const {
      prefix,
      fname,
      mname,
      lname,
      dob,
      gender,
      mobileNumber,
      address,
      pincode,
      city,
      state,
      country,
      maritalStatus,
    } = req.body || {};

    if (!prefix || !fname || !dob || !gender || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const uhid = await generateUHID();

    const patient = await UHID.create({
      uhid,
      prefix,
      fname,
      mname,
      lname,
      dob,
      gender,
      mobileNumber,
      address,
      pincode,
      city,
      state,
      country,
      maritalStatus,
    });

    return res.status(201).json({
      success: true,
      message: "UHID created successfully",
      data: patient,
    });
  } catch (err) {
    console.error("createUHID error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Get all UHIDs (patients)
 */
export const getAllUHIDs = async (req, res) => {
  try {
    const patients = await UHID.find({ deleted: false })
      .populate("prefix")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: patients,
    });
  } catch (err) {
    console.error("getAllUHIDs error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Get single UHID by ID or UHID string
 */
export const getUHID = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await UHID.findOne({
      $or: [{ _id: id }, { uhid: id }],
      deleted: false,
    }).populate("prefix");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.json({
      success: true,
      data: patient,
    });
  } catch (err) {
    console.error("getUHID error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Update UHID details (NOT UHID number)
 */
export const updateUHID = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await UHID.findOneAndUpdate(
      { _id: id, deleted: false },
      req.body,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.json({
      success: true,
      message: "UHID updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("updateUHID error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Soft delete UHID
 */
export const deleteUHID = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await UHID.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.json({
      success: true,
      message: "UHID deleted successfully",
    });
  } catch (err) {
    console.error("deleteUHID error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const searchPatients = async (req, res) => {
  try {
    const { q } = req.query;

    // basic guard
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const regex = new RegExp(q, "i");

    const patients = await UHID.find({
      $or: [{ fname: regex }, { lname: regex }, { uhid: regex }],
    })
      .select("fname lname uhid mobileNumber")
      .limit(10)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: patients,
    });
  } catch (err) {
    console.error("FOLLOW-UP SEARCH ERROR:", err);
    res.status(500).json({
      success: false,
      data: [],
    });
  }
};

export default {
  createUHID,
  getAllUHIDs,
  getUHID,
  updateUHID,
  deleteUHID,
  searchPatients,
};

import OPDEMR from "./model.js";

/**
 * Get full OPD EMR document by opdId
 */
export const getOpdEmrByOpdId = async (req, res) => {
  try {
    const { opdId } = req.params;

    if (!opdId) {
      return res.status(400).json({ message: "opdId is required" });
    }

    const emr = await OPDEMR.findOne({ opdId });

    if (!emr) {
      return res.status(404).json({ message: "OPD EMR not found" });
    }

    res.status(200).json({
      success: true,
      data: emr,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch OPD EMR",
      error: error.message,
    });
  }
};

/**
 * Creates OPD EMR document when an OPD session is registered
 * Safe to call multiple times (idempotent)
 */
export const createOpdEmr = async ({ patientId, opdId, opdNo }) => {
  if (!patientId || !opdId || !opdNo) {
    throw new Error("Missing required fields to create OPD EMR");
  }

  // One EMR per OPD session
  const existingEmr = await OPDEMR.findOne({ opdId });
  if (existingEmr) {
    return existingEmr;
  }

  const emr = await OPDEMR.create({
    patientId,
    opdId,
    opdNo,
  });

  return emr;
};

/**
 * Add a chief complaint to OPD EMR by opdId
 */
export const addChiefComplaint = async (req, res) => {
  try {
    const { opdId } = req.params;
    const complaintData = req.body;

    if (!opdId) {
      return res.status(400).json({ message: "opdId is required" });
    }

    if (!complaintData?.complaint) {
      return res.status(400).json({ message: "complaint field is required" });
    }

    const emr = await OPDEMR.findOneAndUpdate(
      { opdId },
      {
        $push: {
          chiefComplaints: complaintData,
        },
      },
      { new: true },
    );

    if (!emr) {
      return res.status(404).json({ message: "OPD EMR not found" });
    }

    res.status(200).json({
      success: true,
      data: emr.chiefComplaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add chief complaint",
      error: error.message,
    });
  }
};

/**
 * Delete one chief complaint by complaintId
 */
export const deleteChiefComplaint = async (req, res) => {
  try {
    const { opdId, complaintId } = req.params;

    if (!opdId || !complaintId) {
      return res
        .status(400)
        .json({ message: "opdId and complaintId required" });
    }

    const emr = await OPDEMR.findOneAndUpdate(
      { opdId },
      {
        $pull: {
          chiefComplaints: { _id: complaintId },
        },
      },
      { new: true },
    );

    if (!emr) {
      return res.status(404).json({ message: "OPD EMR not found" });
    }

    res.status(200).json({
      success: true,
      data: emr.chiefComplaints,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete chief complaint",
      error: err.message,
    });
  }
};

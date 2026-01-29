import FamilyHistoryMaster from "./model.js";

const ALLOWED_FIELDS = [
  "history",
  "member",
  "since",
];

export const createFamilyHistoryMaster = async (req, res) => {
  try {
    const { departmentId, history } = req.body;

    if (!departmentId) {
      return res.status(400).json({
        success: false,
        message: "Department is required",
      });
    }

    const exists = await FamilyHistoryMaster.findOne({ departmentId });
    if (exists) {
      return res.status(200).json({
        success: true,
        data: exists,
      });
    }

    const created = await FamilyHistoryMaster.create({
      departmentId,
      history: history || [],
    });

    res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    console.error("createFamilyHistoryMaster error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getByDepartmentId = async (req, res) => {
  try {
    const { departmentId } = req.params;

    if (!departmentId) {
      return res.status(400).json({
        success: false,
        message: "DepartmentId required",
      });
    }

    const data = await FamilyHistoryMaster.findOne({
      departmentId,
      deleted: false,
    }).populate("departmentId", "departmentName");

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("getFamilyHistoryByDepartmentId error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addSuggestion = async (req, res) => {
  try {
    const { departmentId, field, value } = req.body;

    if (!departmentId || !field || !value) {
      return res.status(400).json({
        success: false,
        message: "DepartmentId, field and value are required",
      });
    }

    if (!ALLOWED_FIELDS.includes(field)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field",
      });
    }

    const updated = await FamilyHistoryMaster.findOneAndUpdate(
      { departmentId },
      { $addToSet: { [field]: value } },
      { new: true, upsert: true },
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("addFamilyHistorySuggestion error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateSuggestion = async (req, res) => {
  try {
    const { departmentId, field, oldValue, newValue } = req.body;

    if (!departmentId || !field || !oldValue || !newValue) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!ALLOWED_FIELDS.includes(field)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field",
      });
    }

    const updated = await FamilyHistoryMaster.findOneAndUpdate(
      { departmentId, [field]: oldValue },
      { $set: { [`${field}.$`]: newValue } },
      { new: true },
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("updateFamilyHistorySuggestion error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteSuggestion = async (req, res) => {
  try {
    const { departmentId, field, value } = req.body;

    if (!departmentId || !field || !value) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!ALLOWED_FIELDS.includes(field)) {
      return res.status(400).json({
        success: false,
        message: "Invalid field",
      });
    }

    const updated = await FamilyHistoryMaster.findOneAndUpdate(
      { departmentId },
      { $pull: { [field]: value } },
      { new: true },
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("deleteFamilyHistorySuggestion error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

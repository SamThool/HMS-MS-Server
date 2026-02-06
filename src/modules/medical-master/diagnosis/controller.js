import Diagnosis from "./model.js";

// Create Diagnosis
export const createDiagnosis = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Diagnosis name is required" });
    }

    const existing = await Diagnosis.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Diagnosis already exists" });
    }

    const diagnosis = new Diagnosis({ name });
    await diagnosis.save();

    res
      .status(201)
      .json({ message: "Diagnosis created successfully", diagnosis });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Diagnoses (non-deleted)
export const getDiagnoses = async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Diagnosis
export const updateDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const diagnosis = await Diagnosis.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!diagnosis) {
      return res.status(404).json({ message: "Diagnosis not found" });
    }

    res
      .status(200)
      .json({ message: "Diagnosis updated successfully", diagnosis });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Soft Delete Diagnosis
export const deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;

    const diagnosis = await Diagnosis.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!diagnosis) {
      return res.status(404).json({ message: "Diagnosis not found" });
    }

    res.status(200).json({ message: "Diagnosis deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

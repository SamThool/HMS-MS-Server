import Medicine from "./model.js";

/**
 * CREATE Medicine
 */
export const createMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();

    res.status(201).json({
      message: "Medicine created successfully",
      medicine,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Medicine with same brand and strength already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET All Medicines (non-deleted)
 */
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ deleted: false })
      .populate("generic")
      .populate("brand")
      .populate("type")
      .populate("category")
      .populate("route")
      .populate("dose")
      .sort({ createdAt: -1 });

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET Single Medicine
 */
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      deleted: false,
    })
      .populate("generic")
      .populate("brand")
      .populate("type")
      .populate("category")
      .populate("route")
      .populate("dose");

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * UPDATE Medicine
 */
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({
      message: "Medicine updated successfully",
      medicine,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Medicine with same brand and strength already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * SOFT DELETE Medicine
 */
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

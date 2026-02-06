import GenericMed from "./model.js";

// ✅ Create Generic Medicine
export const createGenericMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Generic medicine name is required" });
    }

    const existing = await GenericMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Generic medicine already exists" });
    }

    const genericMed = new GenericMed({ name });
    await genericMed.save();

    res.status(201).json({
      message: "Generic medicine created successfully",
      genericMed,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Generic Medicines
export const getGenericMeds = async (req, res) => {
  try {
    const genericMeds = await GenericMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(genericMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Generic Medicine
export const updateGenericMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genericMed = await GenericMed.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!genericMed) {
      return res.status(404).json({ message: "Generic medicine not found" });
    }

    res.status(200).json({
      message: "Generic medicine updated successfully",
      genericMed,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Generic Medicine
export const deleteGenericMed = async (req, res) => {
  try {
    const { id } = req.params;

    const genericMed = await GenericMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!genericMed) {
      return res.status(404).json({ message: "Generic medicine not found" });
    }

    res.status(200).json({ message: "Generic medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

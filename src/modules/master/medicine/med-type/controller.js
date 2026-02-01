import TypeMed from "./model.js";

export const createTypeMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Medicine type is required" });
    }

    const existing = await TypeMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Medicine type already exists" });
    }

    const typeMed = new TypeMed({ name });
    await typeMed.save();

    res.status(201).json({ message: "Medicine type created successfully", typeMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTypeMeds = async (req, res) => {
  try {
    const typeMeds = await TypeMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(typeMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTypeMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const typeMed = await TypeMed.findByIdAndUpdate(id, { name }, { new: true });

    if (!typeMed) {
      return res.status(404).json({ message: "Medicine type not found" });
    }

    res.status(200).json({ message: "Medicine type updated successfully", typeMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTypeMed = async (req, res) => {
  try {
    const { id } = req.params;

    const typeMed = await TypeMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!typeMed) {
      return res.status(404).json({ message: "Medicine type not found" });
    }

    res.status(200).json({ message: "Medicine type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import DoseMed from "./model.js";

export const createDoseMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Dose is required" });
    }

    const existing = await DoseMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Dose already exists" });
    }

    const doseMed = new DoseMed({ name });
    await doseMed.save();

    res.status(201).json({ message: "Dose created successfully", doseMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDoseMeds = async (req, res) => {
  try {
    const doseMeds = await DoseMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(doseMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateDoseMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const doseMed = await DoseMed.findByIdAndUpdate(id, { name }, { new: true });

    if (!doseMed) {
      return res.status(404).json({ message: "Dose not found" });
    }

    res.status(200).json({ message: "Dose updated successfully", doseMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteDoseMed = async (req, res) => {
  try {
    const { id } = req.params;

    const doseMed = await DoseMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!doseMed) {
      return res.status(404).json({ message: "Dose not found" });
    }

    res.status(200).json({ message: "Dose deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

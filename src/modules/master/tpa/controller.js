import TPA from "./model.js";

// CREATE
export const createTPA = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "TPA company name is required",
      });
    }

    const created = await TPA.create({ name });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllTPAs = async (req, res) => {
  try {
    const data = await TPA.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(data); // ALWAYS ARRAY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateTPA = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await TPA.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SOFT DELETE
export const deleteTPA = async (req, res) => {
  try {
    await TPA.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

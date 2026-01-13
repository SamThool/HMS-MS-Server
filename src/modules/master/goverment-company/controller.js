import GovernmentCompany from "./model.js";

export const createGovernmentCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "Government company name required" });
    }
    const created = await GovernmentCompany.create({ name });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllGovernmentCompanies = async (req, res) => {
  try {
    const data = await GovernmentCompany.find({ deleted: false }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGovernmentCompany = async (req, res) => {
  try {
    const updated = await GovernmentCompany.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteGovernmentCompany = async (req, res) => {
  try {
    await GovernmentCompany.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import InsuranceCompany from "./model.js";

// CREATE
export const createInsuranceCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Insurance company name is required",
      });
    }

    const created = await InsuranceCompany.create({ name });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllInsuranceCompanies = async (req, res) => {
  try {
    const data = await InsuranceCompany.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(data); // always array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateInsuranceCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await InsuranceCompany.findByIdAndUpdate(
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
export const deleteInsuranceCompany = async (req, res) => {
  try {
    await InsuranceCompany.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

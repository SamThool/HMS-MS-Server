import BrandMed from "./model.js";

export const createBrandMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const existing = await BrandMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brandMed = new BrandMed({ name });
    await brandMed.save();

    res.status(201).json({ message: "Brand created successfully", brandMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBrandMeds = async (req, res) => {
  try {
    const brandMeds = await BrandMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(brandMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBrandMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const brandMed = await BrandMed.findByIdAndUpdate(id, { name }, { new: true });

    if (!brandMed) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand updated successfully", brandMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBrandMed = async (req, res) => {
  try {
    const { id } = req.params;

    const brandMed = await BrandMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!brandMed) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

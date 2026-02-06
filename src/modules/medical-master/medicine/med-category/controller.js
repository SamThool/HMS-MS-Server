import CategoryMed from "./model.js";

export const createCategoryMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await CategoryMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const categoryMed = new CategoryMed({ name });
    await categoryMed.save();

    res.status(201).json({ message: "Category created successfully", categoryMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCategoryMeds = async (req, res) => {
  try {
    const categoryMeds = await CategoryMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(categoryMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCategoryMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoryMed = await CategoryMed.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!categoryMed) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      categoryMed,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCategoryMed = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryMed = await CategoryMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!categoryMed) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

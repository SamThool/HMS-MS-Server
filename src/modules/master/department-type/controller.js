import DepartmentType from "./model.js";

// ✅ Create Department Type
export const createDepartmentType = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Department Type name is required" });
    }

    const existing = await DepartmentType.findOne({ name, deleted: false });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Department Type already exists" });
    }

    const departmentType = new DepartmentType({ name });
    await departmentType.save();

    res
      .status(201)
      .json({
        message: "Department Type created successfully",
        departmentType,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Department Types (non-deleted)
export const getDepartmentTypes = async (req, res) => {
  try {
    const departmentTypes = await DepartmentType.find({ deleted: false }).sort({
      name: 1,
    });
    res.status(200).json(departmentTypes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Department Type
export const updateDepartmentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const departmentType = await DepartmentType.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!departmentType) {
      return res.status(404).json({ message: "Department Type not found" });
    }

    res.status(200).json({
      message: "Department Type updated successfully",
      departmentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete Department Type
export const deleteDepartmentType = async (req, res) => {
  try {
    const { id } = req.params;

    const departmentType = await DepartmentType.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!departmentType) {
      return res.status(404).json({ message: "Department Type not found" });
    }

    res.status(200).json({ message: "Department Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

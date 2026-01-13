import DepartmentSubType from "./model.js";

// ✅ Create Sub-Type
export const createDepartmentSubType = async (req, res) => {
  try {
    const { name, departmentType } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Department Sub-Type name is required" });
    }

    if (!departmentType) {
      return res.status(400).json({ message: "Department Type is required" });
    }

    const existing = await DepartmentSubType.findOne({
      name,
      departmentType,
      deleted: false,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Department Sub-Type already exists" });
    }

    const subType = new DepartmentSubType({ name, departmentType });
    await subType.save();

    res.status(201).json({
      message: "Department Sub-Type created successfully",
      subType,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All (non-deleted)
export const getDepartmentSubTypes = async (req, res) => {
  try {
    const list = await DepartmentSubType.find({ deleted: false })
      .populate("departmentType", "name")
      .sort({ name: 1 });

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update
export const updateDepartmentSubType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, departmentType } = req.body;

    const updated = await DepartmentSubType.findByIdAndUpdate(
      id,
      { name, departmentType },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Department Sub-Type not found" });
    }

    res.status(200).json({
      message: "Department Sub-Type updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Soft Delete
export const deleteDepartmentSubType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DepartmentSubType.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: "Department Sub-Type not found" });
    }

    res
      .status(200)
      .json({ message: "Department Sub-Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

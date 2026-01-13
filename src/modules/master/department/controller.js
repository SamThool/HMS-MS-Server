import DepartmentMaster from "./model.js";

// *****************************************************
// ✅ Create Department
// *****************************************************
export const createDepartment = async (req, res) => {
  try {
    const {
      departmentType,
      departmentSubType,
      departmentName,
      departmentCode,
    } = req.body;

    // Validation
    if (!departmentType) {
      return res.status(400).json({ message: "Department Type is required" });
    }

    if (!departmentSubType) {
      return res
        .status(400)
        .json({ message: "Department Sub-Type is required" });
    }

    if (!departmentName) {
      return res.status(400).json({ message: "Department Name is required" });
    }

    if (!departmentCode) {
      return res.status(400).json({ message: "Department Code is required" });
    }

    // Check if already exists (same name + type + subtype)
    const existing = await DepartmentMaster.findOne({
      departmentType,
      departmentSubType,
      departmentName,
      deleted: false,
    });

    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }

    // Create
    const department = new DepartmentMaster({
      departmentType,
      departmentSubType,
      departmentName,
      departmentCode,
    });

    await department.save();

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// *****************************************************
// ✅ Get All (non-deleted)
// *****************************************************
export const getDepartments = async (req, res) => {
  try {
    const list = await DepartmentMaster.find({ deleted: false })
      .populate("departmentType", "name")
      .populate("departmentSubType", "name")
      .sort({ departmentName: 1 });

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// *****************************************************
// ✅ Update Department
// *****************************************************
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      departmentType,
      departmentSubType,
      departmentName,
      departmentCode,
    } = req.body;

    const updated = await DepartmentMaster.findByIdAndUpdate(
      id,
      {
        departmentType,
        departmentSubType,
        departmentName,
        departmentCode,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// *****************************************************
// ✅ Soft Delete Department
// *****************************************************
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DepartmentMaster.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

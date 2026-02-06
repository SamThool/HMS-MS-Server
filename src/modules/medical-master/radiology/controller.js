import Radiology from "./model.js";

// CREATE
export const createRadiology = async (req, res) => {
  try {
    const data = await Radiology.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getRadiology = async (req, res) => {
  try {
    const data = await Radiology.find({ deleted: false })
      .populate("departmentId", "departmentName")
      //   .populate("subDepartmentId", "name")
      .populate("billGroupId", "name")
      .sort({ testName: 1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateRadiology = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Radiology.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE (SOFT)
export const deleteRadiology = async (req, res) => {
  try {
    const { id } = req.params;
    await Radiology.findByIdAndUpdate(id, { deleted: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

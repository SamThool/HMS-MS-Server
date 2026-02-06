import Pathology from "./model.js";

export const createPathology = async (req, res) => {
  try {
    const data = await Pathology.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPathology = async (req, res) => {
  try {
    const data = await Pathology.find({ deleted: false })
      .populate("departmentId", "departmentName")
      // .populate("subDepartmentId", "name")
      .populate("billGroupId", "name")
      .sort({ testName: 1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePathology = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Pathology.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deletePathology = async (req, res) => {
  try {
    const { id } = req.params;
    await Pathology.findByIdAndUpdate(id, { deleted: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

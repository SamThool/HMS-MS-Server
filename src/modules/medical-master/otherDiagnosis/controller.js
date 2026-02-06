import OtherDiagnosis from "./model.js";

export const createOtherDiagnosis = async (req, res) => {
  try {
    const data = await OtherDiagnosis.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOtherDiagnosis = async (req, res) => {
  try {
    const data = await OtherDiagnosis.find({ deleted: false })
      .populate("departmentId", "departmentName")
      // .populate("subDepartmentId", "name")
      .populate("billGroupId", "name")
      .sort({ testName: 1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOtherDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await OtherDiagnosis.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOtherDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    await OtherDiagnosis.findByIdAndUpdate(id, { deleted: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import Procedure from "./model.js";

/* ---------- GET ALL ---------- */
export const getProcedures = async (req, res) => {
  try {
    const data = await Procedure.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------- CREATE ---------- */
export const createProcedure = async (req, res) => {
  try {
    const { text } = req.body;

    const procedure = await Procedure.create({ text });

    res.json({ success: true, data: procedure });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------- UPDATE ---------- */
export const updateProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updated = await Procedure.findByIdAndUpdate(
      id,
      { text },
      { new: true },
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------- DELETE (SOFT) ---------- */
export const deleteProcedure = async (req, res) => {
  try {
    const { id } = req.params;

    await Procedure.findByIdAndUpdate(id, { deleted: true });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------------------
   SUGGESTION: ADD
-------------------------------------------------- */
export const addProcedureSuggestion = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value || !value.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Value required" });
    }

    const exists = await Procedure.findOne({
      text: value.trim(),
      deleted: false,
    });

    if (exists) {
      return res.json({ success: true }); // silently ignore duplicates
    }

    await Procedure.create({ text: value.trim() });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------------------
   SUGGESTION: UPDATE
-------------------------------------------------- */
export const updateProcedureSuggestion = async (req, res) => {
  try {
    const { oldValue, newValue } = req.body;

    if (!newValue || !newValue.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "New value required" });
    }

    await Procedure.findOneAndUpdate(
      { text: oldValue, deleted: false },
      { text: newValue.trim() },
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------------------
   SUGGESTION: DELETE (SOFT)
-------------------------------------------------- */
export const deleteProcedureSuggestion = async (req, res) => {
  try {
    const { value } = req.body;

    await Procedure.findOneAndUpdate(
      { text: value, deleted: false },
      { deleted: true },
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

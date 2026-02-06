import Instruction from "./model.js";

export const getInstructions = async (req, res) => {
  try {
    const data = await Instruction.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createInstruction = async (req, res) => {
  try {
    const { text } = req.body;

    const instruction = await Instruction.create({ text });

    res.json({ success: true, data: instruction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateInstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updated = await Instruction.findByIdAndUpdate(
      id,
      { text },
      { new: true },
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteInstruction = async (req, res) => {
  try {
    const { id } = req.params;

    await Instruction.findByIdAndUpdate(id, { deleted: true });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------------------
   SUGGESTION: ADD
-------------------------------------------------- */
export const addInstructionSuggestion = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value || !value.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Value required" });
    }

    const exists = await Instruction.findOne({
      text: value.trim(),
      deleted: false,
    });

    if (exists) {
      return res.json({ success: true }); // ignore duplicates
    }

    await Instruction.create({ text: value.trim() });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------------------------
   SUGGESTION: UPDATE
-------------------------------------------------- */
export const updateInstructionSuggestion = async (req, res) => {
  try {
    const { oldValue, newValue } = req.body;

    if (!newValue || !newValue.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "New value required" });
    }

    await Instruction.findOneAndUpdate(
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
export const deleteInstructionSuggestion = async (req, res) => {
  try {
    const { value } = req.body;

    await Instruction.findOneAndUpdate(
      { text: value, deleted: false },
      { deleted: true },
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

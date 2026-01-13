import Counter from "../counter/model.js";

export const generateUHID = async () => {
  const year = new Date().getFullYear();
  const key = `UHID-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedSeq = String(counter.seq).padStart(6, "0");

  return `HMS-${year}-${paddedSeq}`;
};

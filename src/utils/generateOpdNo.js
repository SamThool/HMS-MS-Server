import OPDPatient from "../modules/opd/registration/model.js";

export const generateOpdNo = async () => {
  const now = new Date();

  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const prefix = `OPD-${yy}${mm}${dd}`;

  const lastOpd = await OPDPatient.findOne({
    opdno: { $regex: `^${prefix}` },
  }).sort({ createdAt: -1 });

  let nextSeq = "001";

  if (lastOpd) {
    const lastSeq = parseInt(lastOpd.opdno.split("-")[2]);
    nextSeq = String(lastSeq + 1).padStart(3, "0");
  }

  return `${prefix}-${nextSeq}`;
};

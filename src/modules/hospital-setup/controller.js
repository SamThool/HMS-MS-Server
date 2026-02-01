import HospitalSetup from "./model.js";

/**
 * Get Hospital Setup
 * Used for receipts, bills, headers, etc.
 */
export const getHospitalSetup = async (req, res) => {
  const hospital = await HospitalSetup.findOne();

  res.status(200).json({
    success: true,
    data: hospital,
  });
};

/**
 * Create or Update Hospital Setup
 * Only ONE hospital is allowed
 */
export const saveHospitalSetup = async (req, res) => {
  const data = req.body;

  const hospital = await HospitalSetup.findOneAndUpdate(
    {},            // empty filter → single document
    data,
    {
      new: true,
      upsert: true, // create if not exists
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Hospital setup saved successfully",
    data: hospital,
  });
};

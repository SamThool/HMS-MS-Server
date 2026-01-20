// HMS-MS-Server/src/modules/master/payee-rate-configuration/controller.js
import PayeeRateConfiguration from "./model.js";

// CREATE
export const createPayeeRateConfiguration = async (req, res) => {
  try {
    const { Category, ParentPayee, Payee, rateList } = req.body;

    // Validation - Category and rateList are required
    if (!Category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!rateList) {
      return res.status(400).json({
        success: false,
        message: "Rate List is required",
      });
    }

    // Create the configuration
    const created = await PayeeRateConfiguration.create({
      Category,
      ParentPayee: ParentPayee || null,
      Payee: Payee || null,
      rateList,
    });

    res.status(201).json({
      success: true,
      message: "Payee rate configuration created successfully",
      data: created,
    });
  } catch (err) {
    console.error("createPayeeRateConfiguration error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// GET ALL (non-deleted)
export const getAllPayeeRateConfigurations = async (req, res) => {
  try {
    const data = await PayeeRateConfiguration.find({ deleted: false })
      .populate("Category", "name")
      .populate("rateList", "name")
      .populate("ParentPayee", "name")
      .populate("Payee", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("getAllPayeeRateConfigurations error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// UPDATE
export const updatePayeeRateConfiguration = async (req, res) => {
  try {
    const { Category, ParentPayee, Payee, rateList } = req.body;
    const { id } = req.params;

    // Validation
    if (!Category || !rateList) {
      return res.status(400).json({
        success: false,
        message: "Category and Rate List are required",
      });
    }

    const updated = await PayeeRateConfiguration.findByIdAndUpdate(
      id,
      {
        Category,
        ParentPayee: ParentPayee || null,
        Payee: Payee || null,
        rateList,
      },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Payee rate configuration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payee rate configuration updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("updatePayeeRateConfiguration error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// SOFT DELETE
export const deletePayeeRateConfiguration = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PayeeRateConfiguration.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Payee rate configuration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payee rate configuration deleted successfully",
    });
  } catch (err) {
    console.error("deletePayeeRateConfiguration error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// FIND PAYEE RATE CONFIGURATION (exact match)
export const findPayeeRateConfiguration = async (req, res) => {
  try {
    const { category, parentPayee, payee } = req.body;

    // Validation
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Build exact-match query
    const query = {
      Category: category,
      deleted: false,
      ParentPayee: parentPayee || null,
      Payee: payee || null,
    };

    const config =
      await PayeeRateConfiguration.findOne(query).populate("rateList");

    if (!config) {
      return res.status(200).json({
        success: false,
        message: "No matching payee rate configuration found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: config,
    });
  } catch (err) {
    console.error("findPayeeRateConfiguration error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

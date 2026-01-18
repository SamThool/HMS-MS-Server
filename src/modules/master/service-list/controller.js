import ServiceList from "./model.js";

/**
 * @desc    Create new Service List
 * @route   POST /api/service-list
 */
export const createServiceList = async (req, res) => {
  try {
    const { serviceName, alternateServiceName, billGroup, ledger, subLedger, departments } = req.body;

    if (!serviceName || !billGroup || !ledger || !subLedger) {
      return res.status(400).json({
        success: false,
        message: "Service Name, Bill Group, Ledger, and SubLedger are required",
      });
    }

    const serviceList = await ServiceList.create({
      serviceName,
      alternateServiceName: alternateServiceName || "",
      billGroup,
      ledger,
      subLedger,
      departments: Array.isArray(departments) ? departments : [],
    });

    const populatedServiceList = await ServiceList.findById(serviceList._id)
      .populate("billGroup", "name code")
      .populate("ledger", "name ledgerType")
      .populate("subLedger", "name")
      .populate("departments", "departmentName departmentCode");

    res.status(201).json({
      success: true,
      message: "Service List created successfully",
      data: populatedServiceList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all Service Lists (non-deleted)
 * @route   GET /api/service-list
 */
export const getAllServiceLists = async (req, res) => {
  try {
    const serviceLists = await ServiceList.find({ deleted: false })
      .populate("billGroup", "name code")
      .populate("ledger", "name ledgerType")
      .populate("subLedger", "name")
      .populate("departments", "departmentName departmentCode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: serviceLists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get Service List by ID
 * @route   GET /api/service-list/:id
 */
export const getServiceListById = async (req, res) => {
  try {
    const serviceList = await ServiceList.findOne({
      _id: req.params.id,
      deleted: false,
    })
      .populate("billGroup", "name code")
      .populate("ledger", "name ledgerType")
      .populate("subLedger", "name")
      .populate("departments", "departmentName departmentCode");

    if (!serviceList) {
      return res.status(404).json({
        success: false,
        message: "Service List not found",
      });
    }

    res.status(200).json({
      success: true,
      data: serviceList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update Service List
 * @route   PUT /api/service-list/:id
 */
export const updateServiceList = async (req, res) => {
  try {
    const { serviceName, alternateServiceName, billGroup, ledger, subLedger, departments } = req.body;

    const serviceList = await ServiceList.findByIdAndUpdate(
      req.params.id,
      {
        serviceName,
        alternateServiceName,
        billGroup,
        ledger,
        subLedger,
        departments: Array.isArray(departments) ? departments : [],
      },
      { new: true, runValidators: true }
    )
      .populate("billGroup", "name code")
      .populate("ledger", "name ledgerType")
      .populate("subLedger", "name")
      .populate("departments", "departmentName departmentCode");

    if (!serviceList) {
      return res.status(404).json({
        success: false,
        message: "Service List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service List updated successfully",
      data: serviceList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Soft Delete Service List
 * @route   DELETE /api/service-list/:id
 */
export const deleteServiceList = async (req, res) => {
  try {
    const serviceList = await ServiceList.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!serviceList) {
      return res.status(404).json({
        success: false,
        message: "Service List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service List deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import ServiceRate from "./model.js";

/**
 * @desc    Create new Service Rate
 * @route   POST /api/service-rate
 */
export const createServiceRate = async (req, res) => {
  try {
    const { name, services } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Services array is required and must not be empty",
      });
    }

    // Validate each service item
    for (const serviceItem of services) {
      if (!serviceItem.service || serviceItem.price === undefined) {
        return res.status(400).json({
          success: false,
          message: "Each service must have service id and price",
        });
      }
      if (typeof serviceItem.price !== "number" || serviceItem.price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a non-negative number",
        });
      }
    }

    const serviceRate = await ServiceRate.create({
      name,
      services,
    });

    const populatedServiceRate = await ServiceRate.findById(
      serviceRate._id
    ).populate("services.service", "serviceName alternateServiceName");

    res.status(201).json({
      success: true,
      message: "Service Rate created successfully",
      data: populatedServiceRate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all Service Rates (non-deleted)
 * @route   GET /api/service-rate
 */
export const getAllServiceRates = async (req, res) => {
  try {
    const serviceRates = await ServiceRate.find({ deleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: serviceRates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get Service Rate by ID
 * @route   GET /api/service-rate/:id
 */
export const getServiceRateById = async (req, res) => {
  try {
    const serviceRate = await ServiceRate.findOne({
      _id: req.params.id,
      deleted: false,
    }).populate("services.service", "serviceName alternateServiceName");

    if (!serviceRate) {
      return res.status(404).json({
        success: false,
        message: "Service Rate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: serviceRate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update Service Rate
 * @route   PUT /api/service-rate/:id
 */
export const updateServiceRate = async (req, res) => {
  try {
    const { name, services } = req.body;

    // Validate services array if provided
    if (services !== undefined) {
      if (!Array.isArray(services)) {
        return res.status(400).json({
          success: false,
          message: "Services must be an array",
        });
      }

      for (const serviceItem of services) {
        if (!serviceItem.service || serviceItem.price === undefined) {
          return res.status(400).json({
            success: false,
            message: "Each service must have service id and price",
          });
        }
        if (typeof serviceItem.price !== "number" || serviceItem.price < 0) {
          return res.status(400).json({
            success: false,
            message: "Price must be a non-negative number",
          });
        }
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (services !== undefined) updateData.services = services;

    const serviceRate = await ServiceRate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("services.service", "serviceName alternateServiceName");

    if (!serviceRate) {
      return res.status(404).json({
        success: false,
        message: "Service Rate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Rate updated successfully",
      data: serviceRate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Soft Delete Service Rate
 * @route   DELETE /api/service-rate/:id
 */
export const deleteServiceRate = async (req, res) => {
  try {
    const serviceRate = await ServiceRate.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!serviceRate) {
      return res.status(404).json({
        success: false,
        message: "Service Rate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Rate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

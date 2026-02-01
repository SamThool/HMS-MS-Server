import RouteMed from "./model.js";

export const createRouteMed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Route name is required" });
    }

    const existing = await RouteMed.findOne({ name, deleted: false });
    if (existing) {
      return res.status(400).json({ message: "Route already exists" });
    }

    const routeMed = new RouteMed({ name });
    await routeMed.save();

    res.status(201).json({ message: "Route created successfully", routeMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRouteMeds = async (req, res) => {
  try {
    const routeMeds = await RouteMed.find({ deleted: false }).sort({ name: 1 });
    res.status(200).json(routeMeds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateRouteMed = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const routeMed = await RouteMed.findByIdAndUpdate(id, { name }, { new: true });

    if (!routeMed) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Route updated successfully", routeMed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteRouteMed = async (req, res) => {
  try {
    const { id } = req.params;

    const routeMed = await RouteMed.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!routeMed) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

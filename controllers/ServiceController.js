const ServService = require("../services/ServService");
const servService = new ServService();

exports.getAllService = async (req, res) => {
  try {
    const services = await servService.getAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await servService.getById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await servService.create(req.body);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await servService.update(
      req.params.id,
      req.body
    );
    if (!updatedService) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await servService.delete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const ServService = require("../services/ServService");
const servService = new ServService();

const uploadDir = "../uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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

exports.createService = [
  upload.single("SER_IMAGEN"),
  async (req, res) => {
    try {
      const serviceData = req.body;
      if (req.file) {
        serviceData.SER_IMAGEN = req.file.path;
      }
      const newService = await servService.create(serviceData);
      res.status(201).json(newService);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.updateService = [
  upload.single("SER_IMAGEN"),
  async (req, res) => {
    try {
      const serviceData = req.body;
      if (req.file) {
        serviceData.SER_IMAGEN = req.file.path;
      }
      const updatedService = await servService.update(
        req.params.id,
        serviceData
      );
      if (!updatedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
      }
      res.json({ message: "Servicio actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

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

const fs = require('fs');
const multer = require('multer');
const path = require('path');
const EmployeeService = require('../services/EmployeeService');
const employeeService = new EmployeeService();

const uploadDir = '../uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAll();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEmployee = [
    upload.single('EMP_IMAGEN'),
    async (req, res) => {
        try {
            const employeeData = req.body;
            if (req.file) {
                employeeData.EMP_IMAGEN = req.file.path;
            }
            const newEmployee = await employeeService.create(employeeData);
            res.status(201).json(newEmployee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.updateEmployee = [
    upload.single('EMP_IMAGEN'),
    async (req, res) => {
        try {
            const employeeData = req.body;
            if (req.file) {
                employeeData.EMP_IMAGEN = req.file.path;
            }
            const updatedEmployee = await employeeService.update(req.params.id, employeeData);
            if (!updatedEmployee) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
            res.json({ message: 'Empleado actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await employeeService.delete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
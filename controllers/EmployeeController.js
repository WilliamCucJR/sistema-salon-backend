const EmployeeService = require('../services/EmployeeService');
const employeeService = new EmployeeService();

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

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = await employeeService.create(req.body);
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await employeeService.update(req.params.id, req.body);
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
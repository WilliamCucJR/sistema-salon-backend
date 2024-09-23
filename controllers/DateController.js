const path = require('path');
const DateService = require('../services/DateService');
const dateService = new DateService();

exports.getAllDates = async (req, res) => {
    try {
        const dates = await dateService.getAll();
        res.json(dates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDateById = async (req, res) => {
    try {
        const date = await dateService.getById(req.params.id);
        if (!date) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json(date);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDate = async (req, res) => {
    try {
      const dateData = req.body;
      const newDate = await dateService.create(dateData);
      res.status(201).json(newDate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateDate = async (req, res) => {
    try {
      const dateData = req.body;
      const updatedDate = await dateService.update(req.params.id, dateData);
  
      if (!updatedDate) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
  
      res.status(200).json({ message: 'Cita actualizada correctamente', updatedDate });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.deleteDate = async (req, res) => {
    try {
        const deletedDate = await dateService.delete(req.params.id);
        if (!deletedDate) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
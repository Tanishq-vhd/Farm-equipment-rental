const express = require('express');
const router = express.Router();
const { 
    uploadEquipment, 
    getAllEquipments, 
    rentEquipment, 
    updateAvailability, 
    filterEquipments
} = require('../controllers/equipmentController');

// Route to get all equipments
router.get("/", getAllEquipments);

// Route to upload new equipment with coordinates
router.post("/upload",uploadEquipment);

// Route to rent equipment
router.post('/rent/:equipmentId', rentEquipment);

// Route to update availability of equipment
router.post('/updateAvailability/:equipmentId', updateAvailability);

router.get("/filter",filterEquipments);

module.exports = router;


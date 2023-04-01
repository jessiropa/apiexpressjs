/*
    membuat router / endpoint
*/ 
const router = require('express').Router();
const userController = require('../controller/userController');
const userModel = require('../models/userModel');

// membuat enpoint untuk tambah data 
router.post('/tambahData', userController.tambahData); 
// enpoint untuk menampilkan semua data
router.get('/getData', userController.getData);
// enpoint untuk menampilkan data berdasarkan id
router.get('/getData/:id', userController.getDataById);
// enpoint untuk update/ubah data 
router.put('/updateData/:id', userController.updateData);
// endpoint untuk menghapus / delete data
router.delete('/deleteData/:id', userController.deleteData);
module.exports = router;
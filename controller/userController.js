const userModel = require('../models/userModel');
const {tambahDataValidation, updateDataValidation} = require('../validation/userValidation');

// tambah data menggunakan async await
const tambahData = async (req, res) => {
    const newUser = new userModel(req.body);

    // validasi data
    const {error} = await tambahDataValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // cek NIM 
    const checkNIM = await userModel.findOne({ NIM: req.body.NIM});
    if (checkNIM) {
        return res.status(400).json({
            message: `NIM ${checkNIM.NIM} telah terdaftar`
        });
    }
    try {
        const response = await newUser.save();
        const data = response;
        res.status(201).json({
            message: "Data berhasil ditambahkan!",
            data,
        })
    } catch (error) {
        console.log(error);
    }
}

// menampilkan semua data (GET ALL DATA)
const getData = async (req, res) =>{
    const cekData = await userModel.find();
    if (cekData.length == 0) {
        res.status(200).json({
            message: "Data tidak ditemukan",
        })
    }
    try {
        const response = await userModel.find();
        const data = response;
        res.status(200).json({
            message: "Berikut ini adalah data mahasiswa!",
            data,
        })
    } catch (error) {
        console.log(error);
    }
}

// menampilkan data berdasarkan ID
const getDataById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await userModel.findById({_id : id});
        if (!response) {
            return res.status(400).json({
                message: 'Data dengan id yang dicari tidak terdaftar',
            });
        }
        const data = response;
        res.status(200).json({
            message: "Berikut data yang dicari : ",
            data,
        })
    } catch (error) {
        console.log(error);
    }
}

// Mengubah / update data
const updateData = async (req, res) => {
    const id = req.params.id;

    // validasi data
    const {error} = await updateDataValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    try {
        const response = await userModel.findByIdAndUpdate({_id: id}, {$set: req.body});
        if (!response) {
            return res.status(400).json({
                message: 'Data dengan id yang dicari tidak terdaftar',
            });
        }
        const beforeData = response;
        const afterData = await userModel.findById({_id: id});
        res.status(201).json({
            message: "Data berhasil diubah!",
            beforeData,
            afterData,
        });
    } catch (error) {
        console.log(error);
    }
}

// Menghapus / delete data 
const deleteData = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await userModel.findByIdAndRemove({_id: id});
        if (!response) {
            return res.status(400).json({
                message: 'Data dengan id yang dicari tidak terdaftar',
            });
        }
        const data = response;
        res.status(201).json({
            message: "Data berhasil dihapus",
            data,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    tambahData,
    getData,
    getDataById,
    updateData,
    deleteData,
};
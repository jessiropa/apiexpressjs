const joi = require('joi');

// tambah data validasi
const tambahDataValidation = (data) => {
    const userSchema = joi.object({
        NIM: joi.number().required(),
        namaLengkap: joi.string().required(),
        namaJurusan: joi.string().required(),
        namaHimpunan: joi.array(),
    });
    return userSchema.validate(data);
};

// update data validation
const updateDataValidation = (data) => {
    const userSchema = joi.object({
        NIM: joi.number().required(),
        namaLengkap: joi.string().required(),
        namaJurusan: joi.string().required(),
        namaHimpunan: joi.array(),
    });
    return userSchema.validate(data);
}

module.exports.tambahDataValidation = tambahDataValidation;
module.exports.updateDataValidation = updateDataValidation;
/*
    Membuat schema collection database 
*/

const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    NIM: {
        type: Number,
        required: true,
    },
    namaLengkap: {
        type: String,
        required: true,
    },
    namaJurusan: {
        type: String,
        enum: {
            values: ["Ilmu Komputer", "Teknik Informatika", "Sistem Informasi"],
        }
    },
    namaHimpunan: {
        type: [String],
        enum: {
            values: ["HMP", "BEM/BLM Fakultas", "KMK", "PMK", "BEM/BLM Universitas", "Paduan suara", "Basket Universitas"],
        },
    },
});

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
})

module.exports = mongoose.model("users", userSchema);
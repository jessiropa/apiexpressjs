const { json } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// membuat koneksi database
mongoose.connect(process.env.MONGODB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// cek koneksi database 
const cekDb = mongoose.connection;
// kondisi jika tidak konek database
cekDb.on("error", (error) =>{
    console.log(error);
});
// kondisi jika konek database
cekDb.once("open", () => {
    console.log(`Database connected!!`);
});

// json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cors
app.use(cors());

// user router 
const userRouter = require('./routes/userRoute');
app.use(userRouter);

// membuat koneksi port
const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`server running on port http://localhost:${PORT}`);
});
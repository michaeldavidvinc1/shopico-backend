import { Request } from "express";
import multer from "multer";
import path from "path";


// Konfigurasi Multer untuk menyimpan file sementara
const upload = multer({
    dest: 'uploads/', // Direktori sementara untuk file yang diunggah
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
    fileFilter: (req: Request, file, cb) => {
        // Validasi tipe file
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Hanya file gambar yang diperbolehkan!'));
    }
});

export default upload
import multer from "multer";
import { path } from "path";

function gerarLetras() {
    const letras = "abcdefghijklmnopqrstuvwxyz";
    let string = "";
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * letras.length);
        string += letras[randomIndex];
    }
    console.log(string)
    return string;
}

function gerarURL() {
    return Date.now() + gerarLetras()
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        const nomeArquivo = gerarURL()
        cb(null, nomeArquivo + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })
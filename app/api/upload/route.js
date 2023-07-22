import multer from "multer";
import path from 'path'

export const POST = async (request) => {

  const formData = await request.formData()
  const image = formData.get("file")

  if (formData && image) {

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

    try {
      console.log(image)
      const teste = upload.single(image)
      if (teste) {
        console.log("Deu bom")
      }
    } catch (error) {
      console.log(error)
    }
    return new Response(JSON.stringify(formData), { status: 200 })
  } else {
    return new Response(`Falha ao criar o posts, ${error}`, { status: 500 })
  }
}


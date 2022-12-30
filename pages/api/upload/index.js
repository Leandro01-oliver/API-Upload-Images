import nc from 'next-connect';
import multer from 'multer';
import path from 'path';

export const config = {
    api: {
      bodyParser: false
    },
  }

 const handlerUpload = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+path.extname(file.originalname))
    },fileFilter: function (req, file, cb) {
        var typeArray = file.mimetype.split('/');
        var fileType = typeArray[1];
        if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {
          cb(null, true);
        } else {
          cb(null, false)
        }
    }
  })

  const upload = multer(
        { 
            storage: storage ,
            limits:{
                fileSize: 1000000
            },
            fileFilter: function(req, file, cb){
                checkFileType(file,cb)
            }
        }
    )

    function checkFileType(file,cb){

        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
    
    if(
        extension == '.jpg' ||
        extension == '.jpeg' ||
        extension == '.png' ||
        mimetyp == 'image/png' ||
        mimetyp == 'image/jpg' ||
        mimetyp == 'image/jpeg'
        ){
            return cb(null, true); 
        }else {
            cb(null, false)
        }
    }

  let uploadFile = upload.single("file");

  handlerUpload.use(uploadFile);

  handlerUpload.post((req,res)=>{

    const mimetyp = req.file.mimetype;

    if(mimetyp == undefined){
        res.json({menssage: "Selecione um tipo de imagem válida como .png, .jpeg ou jpg"});
    }else{
        res.json({menssage: "Upload realizado com sucesso"});
    }

  });


  export default handlerUpload;

  
const userController = require("../controllers/userController");


const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})

module.exports = (app) => {
    
    app.get('/user/getAll', userController.getUsers);

    app.post('/user/login', userController.userLogin);

    app.post('/user/create', userController.addUser);

    app.delete('/user/delete', userController.deleteUser);

    app.put('/user/edit/:id', userController.updateUser);

    app.post('/user/uploadImage/:id',upload.single('avatar'), userController.addImg);
}
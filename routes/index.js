var express = require('express');
var router = express.Router();

// buoc 1: khoi tao khung - Schema
var dbb = 'mongodb+srv://admin:m4s0sNJl074v2Sbg@cluster0.6ado7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.connect(dbb);
var studentSchema = new mongoose.Schema({
  tenSV: 'string',
  emailSV: 'string',
  diaChi: 'string',
  khoa: 'string'
})
// buoc 2: lien ket Schema voi mongoDB qua mongoose
var Student = mongoose.model('student', studentSchema);

router.get('/add', function (req, res) {
  res.render('add', {title: 'Add', message: ''});
})

router.get('/update', function (req, res) {
  Student.find({}, function (err, data) {
    res.render('update', {title: 'Update', message: '', data: data});
  })
})

router.get('/delete', function(req, res, next) {
  Student.find({}, function (err, data) {
    res.render('delete', {data: data, title: 'Delete', message: ''});
  })
});

router.post('/addStudent', function (req, res) {

  var tenSV = req.body.tenSV
  var emailSV = req.body.emailSV
  var diaChi = req.body.diaChi
  var khoa = req.body.khoa

  // buoc 3: khoi tao image voi gia tri lay duoc
  const student = new Student({
    tenSV: tenSV,
    emailSV: emailSV,
    diaChi: diaChi,
    khoa: khoa
  })
  student.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Added successfully'
    } else {
      mess = error
    }
    res.render('add', {title: 'Add', message: mess})
  })
})

router.post('/updateStudent', function (req, res) {

  var _id = req.body._id
  var tenSVMoi = req.body.tenSVMoi
  var emailSVMoi = req.body.emailSVMoi
  var diaChiMoi = req.body.diaChiMoi
  var khoaMoi = req.body.khoaMoi

  Student.updateOne({_id: _id}, {
    tenSV: tenSVMoi,
    emailSV: emailSVMoi,
    diaChi: diaChiMoi,
    khoaMoi: khoaMoi
  }, function (error, data) {
    var mess;
    if (error == null) {
      mess = 'Updated Successfully !'
    } else {
      mess = error
    }
    res.render('update', {title: 'Update', message: mess, data: data})
  })
})

router.post('/deleteStudent', function (req, res) {

  var _id = req.body._id

  Student.deleteOne({_id: _id}, function (error, data) {
    var mess;
    if (error == null) {
      mess = 'Deleted Successfully !'
    } else {
      mess = error
    }
    res.render('delete', {title: 'Delete', message: mess, data: data})
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  Student.find({}, function (err, data) {
    res.render('index', { data: data, title: 'Express' });
  })
});



module.exports = router;

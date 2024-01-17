var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var toast = require('react-toastify')


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data_dictonary'
});
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as ID ' + connection.threadId);
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', { title: 'Express' });
});
router.get('/category_add', function (req, res, next) {
  res.render('category_add', { title: 'Express' });
});
router.get('/company_add', function (req, res, next) {
  res.render('company_add', { title: 'Express' });
});
router.get('/feedback_add', function (req, res, next) {
  res.render('feedback_add', { title: 'Express' });
});
router.get('/form', function (req, res, next) {
  res.render('form', { title: 'Express' });
});
router.get('/changepassword', function (req, res, next) {
  res.render('change');
});

// EDIT User
router.get('/delete/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_user where user_id=?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/user_view");
  })
});
// get single user by id 
router.get('/show/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is " + showid);
  connection.query("select * from  tbl_user where user_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("show", { db_rows_array: db_rows });
  })
});
router.get('/display/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_admin where admin_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("admin_show", { db_rows_array: db_rows });
  })
});
router.get('/exhibit/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_order_master where order_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("order_show", { db_rows_array: db_rows });
  })
});
router.get('/expose/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_orderdetail where order_detail_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("order_detail_show", { db_rows_array: db_rows });
  })
});
router.get('/flash/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_product where product_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("product_show", { db_rows_array: db_rows });
  })
});
router.get('/flaunt/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_category where category_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("category_show", { db_rows_array: db_rows });
  })
});
router.get('/parade/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_company where company_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("company_show", { db_rows_array: db_rows });
  })
});
router.get('/trail/:id', function (req, res,) {
  var showid = req.params.id;
  console.log("show id is" + showid);
  connection.query("select * from  tbl_feedback where feedback_id=?", [showid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    res.render("feedback_show", { db_rows_array: db_rows });
  })
});
router.get('/edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var user_id = req.params.id;
  connection.query("select * from tbl_user where user_id=?", [user_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("edit-form", { db_rows_array: db_rows });
  })
});

router.post('/edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var user_id = req.params.id;

  var user_name = req.body.user_name;
  var user_gender = req.body.user_gender;
  var user_email = req.body.user_email;
  var user_password = req.body.user_password;
  var user_mobile = req.body.user_mobile;

  connection.query("update tbl_user set user_name= ? ,user_gender =?, user_email = ? , user_password = ? ,user_mobile = ? where user_id = ?",
    [user_name, user_gender, user_email, user_password, user_mobile, user_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/user_view');
    });
});

router.get('/admin_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var admin_id = req.params.id;
  connection.query("select * from tbl_admin where admin_id=?", [admin_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("admin_edit", { db_rows_array: db_rows });
  })
});

router.post('/admin_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var admin_id = req.params.id;

  var admin_name = req.body.admin_name;
  var admin_email = req.body.admin_email;
  var admin_password = req.body.admin_password;

  connection.query("update tbl_admin set admin_name= ? ,admin_email = ? ,admin_password = ?  where admin_id = ?",
    [admin_name, admin_email, admin_password, admin_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/admin_view');
    });
});
router.get('/remove/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_admin where admin_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/admin_view");
  })
});
router.get('/eliminate/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_order_master where order_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/order_view");
  })
});
router.get('/erase/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_orderdetail where order_detail_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/order_detail_view");
  })
});
router.get('/eradicate/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_product where product_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/view");
  })
});
router.get('/drop/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_category where category_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/category_view");
  })
});
router.get('/clean/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_company where company_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/company_view");
  })
});
router.get('/destroy/:id', function (req, res, next) {
  var deleteid = req.params.id;
  console.log("delete id is" + deleteid);
  connection.query("delete from  tbl_feedback where feedback_id = ?", [deleteid], function (err, db_rows) {
    console.log(db_rows);
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/feedback_view");
  })
});
router.post('/add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    product_name: req.body.name,
    product_price: req.body.price,
    product_details: req.body.detail,
    product_stock: req.body.stock,
    company_id: req.body.company,
    category_id: req.body.category,
    product_image: req.body.product_image

  }
  connection.query("insert into tbl_product set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('/add');
  });
});
// router.get('/edit/:id', function (req, res) {
//   console.log("Edit id is : " + req.params.id); var user_id = req.params.id;

//   connection.query("select from tbl_user where user_id = ? ", [user_id], function (err, db_rows) {

//     if (err) throw err;

//     console.log(db_rows);

//     res.render("edit-form", { db_rows_array: db_rows });

//   })

// });

module.exports = router;

router.post('/create', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    user_name: req.body.user_name,
    user_mobile: req.body.user_phone,
    user_email: req.body.user_email,
    user_password: req.body.user_password
  }
  connection.query("insert into tbl_user set?", mybodydata, function (err, result) {

    if (err) throw err;
    res.redirect('/login');
  });
});

router.post('/login', function (req, res, next) {
  var email = req.body.txt1;
  var password = req.body.txt2;
  console.log(email, password);
  connection.query("select * from tbl_user ser where user_email = ? and user_password = ?", [email, password], function (err, rows) {
    if (err) {
      res.send(err);
    } else {

      console.log(rows)
      if (rows.length > 0) {
        var username = rows[0].user_name;
        var userid = rows[0].user_id;
        var useremail = rows[0].user_email;

        req.session.username = username;
        req.session.userid = userid;
        req.session.useremail = useremail;

        console.log(req.session.username);
        console.log(req.session.userid);
        console.log(req.session.useremail);
        res.redirect('/');

      } else {

        res.send("login Failed");
      }

    }
  })
});

router.post('/forgot', function (req, res, next) {
  var useremail = req.body.email;

  //Fetch Old Password Data using Query
  connection.query("select * from tbl_user where user_email = ? ", [useremail], function (err, rows) {
    if (err) {
      Response.errorResponse(err, res);
    } else {

      if (rows.length > 0) {
        var userpassword = rows[0].user_password;
        console.log(userpassword);
        //Send Email 

        "use strict";
        const nodemailer = require("nodemailer");

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'meetnode@gmail.com', // generated ethereal user
              pass: "nodemeet", // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: "demo<meetnode@gmail.com>", // sender address
            to: useremail, // list of receivers
            subject: "Forgot Password", // Subject line
            text: "Hello Your Password is " + userpassword, // plain text body
            html: "Hello Your Password is " + userpassword, // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

        res.redirect("login");
      } else {
        res.send("User Not Found");
      }
    }
  })
});

router.post('/category_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    category_name: req.body.c_name,
  }
  connection.query("insert into tbl_category set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('category_add');
  });
});
router.post('/company_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    company_name: req.body.company_name
  }
  connection.query("insert into tbl_company set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('company_add');
  });
});
router.post('/feedback_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    user_id: req.body.user_id,
    feedback_date: req.body.feed_date,
    feedback_message: req.body.feed_mess
  }
  connection.query("insert into tbl_feedback set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('feedback_add');
  });
});
router.post('/order_detail_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    price: req.body.price

  }
  connection.query("insert into tbl_orderdetail set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('order_detail_add');
  });
});
router.post('/order_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    // namdate: req.body.namdate,
    user_id: req.body.user_id,
    order_status: req.body.order_status


  }
  connection.query("insert into tbl_order_master set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('order_add');
  });
});
router.post('/admin_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: req.body.admin_password
  }
  connection.query("insert into tbl_admin set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('admin_Add');
  });
});
router.post('/user_add', function (req, res) {
  console.log(req.body);
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_mobile: req.body.user_mobile

  }
  connection.query("insert into tbl_user set?", mybodydata, function (err, result) {
    if (err) throw err;
    res.redirect('user_add');
  });
});
router.post('/changepassword', function (req, res, next) {
  var userid = req.session.userid;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  //Check user is Logged in or not 
  if (req.session.userid) {
    //Fetch Old Password Data using Query
    connection.query("select * from tbl_user where user_id = ? ", [userid], function (err, rows) {
      if (err) {
        Response.errorResponse(err, res);
      } else {

        if (rows.length > 0) {
          var userpassword = rows[0].user_password;
          console.log(userpassword);
          //Check Old Password is Matched with Database
          if (opass == userpassword) {

            if (npass == cpass) {

              connection.query("update tbl_user set user_password = ? where user_id = ? ", [npass, userid], function (err, rows) {
                res.redirect('login');
              });
            } else {
              res.send("New and Confirm Password not match");
            }

          } else {
            res.send("Old Password not match");
          }

        } else {
          res.send("No Record Found");
        }
      }
    })
  }
  else {
    res.redirect('/login');
  }
});

router.get('/order_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_Order_master", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('order_view', { db_rows_array: db_rows });
  })
});
router.get('/order_detail_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_orderdetail", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('order_detail_view', { db_rows_array: db_rows });
  })
});
router.get('/view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_product", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('tables', { db_rows_array: db_rows });
  })
});
router.get('/category_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_category", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('category_view', { db_rows_array: db_rows });
  })
});
router.get('/company_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_company", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('company_view', { db_rows_array: db_rows });
  })
});
router.get('/feedback_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_feedback", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('feedback_view', { db_rows_array: db_rows });
  })
});
router.get('/user_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_user", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('user_view', { db_rows_array: db_rows });
  })
});
router.get('/admin_view', function (req, res, next) {
  connection.query("SELECT * FROM tbl_admin", function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render('admin_view', { db_rows_array: db_rows });
  })
});

module.exports = router;

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/order_add', function (req, res, next) {
  res.render('order_add');
});
router.get('/admin_add', function (req, res, next) {
  res.render('admin_add');
});
router.get('/order_detail_add', function (req, res, next) {
  res.render('order_detail_add');
});
router.get('/user_add', function (req, res, next) {
  res.render('user_add');
});
router.get('/table', function (req, res, next) {
  res.render('tables');
});
router.get('/add', function (req, res, next) {
  res.render('form');
});
router.get('/display', function (req, res, next) {
  res.render('user_view');
});

router.get('/forgot', function (req, res, next) {
  res.render('forgot');
});
router.get('/create', function (req, res, next) {
  res.render('create');
});



router.get('/order_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var order_id = req.params.id;
  connection.query("select * from tbl_order_master where order_id=?", [order_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("order_edit", { db_rows_array: db_rows });
  })
});

router.post('/order_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var order_id = req.params.id;

  var user_id = req.body.user_id;
  var order_status = req.body.order_status;
  // var admin_password = req.body.admin_password;

  connection.query("update tbl_order_master set user_id= ? ,order_status = ? where order_id = ?",
    [user_id, order_status, order_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/order_view');
    });
});

router.get('/orderdetail_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var order_detail_id = req.params.id;
  connection.query("select * from tbl_orderdetail where order_detail_id=?", [order_detail_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("order_detail_edit", { db_rows_array: db_rows });
  })
});

router.post('/orderdetail_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var order_detail_id = req.params.id;

  var order_id = req.body.order_id;
  var product_id = req.body.product_id;
  var quantity = req.body.quantity;
  var price = req.body.price;

  connection.query("update tbl_orderdetail set order_id = ?, product_id = ?,quantity = ?,price = ? where order_detail_id= ?",
    [order_id, product_id, quantity, price, order_detail_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/order_detail_view');
    });
});


router.get('/product_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var product_id = req.params.id;
  connection.query("select * from tbl_product where product_id=?", [product_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("product_edit", { db_rows_array: db_rows });
  })
});

router.post('/product_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var product_id = req.params.id;

  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var product_details = req.body.product_details;
  var product_stock = req.body.product_stock;
  var company_id = req.body.company_id;
  var category_id = req.body.category_id;
  var product_image = req.body.product_image;

  connection.query("update tbl_product set product_name = ?, product_price = ?,product_details = ? ,product_stock = ? ,company_id = ? ,category_id = ? ,product_image = ? where product_id= ?",
    [product_name, product_price, product_details, product_stock, company_id, category_id, product_image, product_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/view');
    });
});


router.get('/feedback_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var feedback_id = req.params.id;
  connection.query("select * from tbl_feedback where feedback_id=?", [feedback_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("feedback_edit", { db_rows_array: db_rows });
  })
});

router.post('/feedback_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var feedback_id = req.params.id;

  var user_id = req.body.user_id;
  var feedback_date = req.body.feedback_date;
  var feedback_message = req.body.feedback_message;


  connection.query("update tbl_feedback set user_id = ?, feedback_date = ?,feedback_message = ? where feedback_id = ?",
    [user_id, feedback_date, feedback_message, feedback_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/feedback_view');
    });
});

router.get('/category_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var category_id = req.params.id;
  connection.query("select * from tbl_category where category_id=?", [category_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("category_edit", { db_rows_array: db_rows });
  })
});

router.post('/category_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var category_id = req.params.id;

  var category_name = req.body.category_name;



  connection.query("update tbl_category set category_name = ? where category_id = ?",
    [category_name, category_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/category_view');
    });
});

router.get('/company_edit/:id', function (req, res) {

  console.log("edit id is: " + req.params.id);
  var company_id = req.params.id;
  connection.query("select * from tbl_company where company_id=?", [company_id], function (err, db_rows) {
    if (err) throw err;
    console.log(db_rows);
    res.render("company_edit", { db_rows_array: db_rows });
  })
});

router.post('/company_edit/:id', function (req, res) {

  console.log("edit ID is " + req.params.id);
  var company_id = req.params.id;

  var company_name = req.body.company_name;



  connection.query("update tbl_company set company_name = ? where company_id = ?",
    [company_name, company_id], function (err, respond) {
      if (err) throw err;
      res.redirect('/company_view');
    });
});

module.exports = router;
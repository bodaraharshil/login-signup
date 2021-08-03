const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const { JET_SECRET } = require("../config/jwt");
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    },
  });

  var upload = multer({ storage: storage }).single("profile");

router.post("/signup",upload, async (req, res) => {
   console.log("req.body",req.body);
    try {
        const name = req.body.name;
        const birthdate = req.body.birthdate;
        const email = req.body.email;
        const contact = req.body.contact;
        const gender = req.body.gender;
        const skill = req.body.skill || " ";
        const qualification = req.body.qualification;
        const password = req.body.password;
        const profile  = req.file.filename;
      if (!name) {
        return res.send({
          status: 400,
          message: "Name is required",
        });
      }
      if (!birthdate) {
        return res.send({
          status: 400,
          message: "Birth Date is required",
        });
      }
      if (!email) {
        return res.send({
          status: 400,
          message: "Email is required",
        });
      }
      if (!req.file) {
        return res.send({
          status: 400,
          message: "Profile is required",
        });
      }
      if (!skill) {
        return res.send({
          status: 400,
          message: "Username is required",
        });
      }
      if (!qualification) {
        return res.send({
          status: 400,
          message: "Qualification is required",  
        });
      }
      if (!password) {
        return res.send({
          status: 400,
          message: "Password is required",  
        });
      }
      const EmailChecks = await User.findOne({
        where: {
          email: email,
        },
      });
      if (EmailChecks) {
        return res.status(400).json({
          message: "Email is alerady used",
        });
      } else {
        const hashpassword = await bcrypt.hash(password,10);
        const userData = await User.create({
            name,
            birthdate,
            email,
            contact,
            gender,
            profile,
            skill,
            qualification,
            password:hashpassword
        });
        userData
          .save()
          .then((data) => {
            res.status(200).json({
              message: "You have successfuly Sign In!",
              data: data,
            });
          })
          .catch((error) => {
            res.status(200).json({
              message: "error ocured",
              data: error,
            });
          });
      }
    } catch (error) {
      res.status(200).json({
        message: "somthing went wrong",
      });
    }
  });
  
router.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (!email) {
        return res.send({
          status: 400,
          message: "Email is required",
        });
      }
      if (!password) {
        return res.send({
          status: 400,
          message: "password is required",
        });
      }
      
        const finduser = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!finduser) {
          res.status(200).json({
            error: "Email Invalid",
          });
        } else {
          const isPasswordMatch = await bcrypt.compare(
            password,
            finduser.password
          );
          if (!isPasswordMatch) {
            return res.status(200).json({ error: "Password Incorrect!" });
          } else {
            const usertoken = {
              email: finduser.email,
            };
            const token = jwt.sign(usertoken, JET_SECRET);
            const  { email }  = finduser;
            res.json({ token,email,message: "You have successfuly Logged In!"});
          }
        }
    } catch (error) {
      res.status(200).json({
        message: "somthing went wrong",
      });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (!email) {
        return res.send({
          status: 400,
          message: "Email is required",
        });
      }
      if (!password) {
        return res.send({
          status: 400,
          message: "password is required",
        });
      }
      
        const finduser = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!finduser) {
          res.status(400).json({
            message: "Invalid Email",
          });
        } else {
          const isPasswordMatch = await bcrypt.compare(
            password,
            finduser.password
          );
          if (!isPasswordMatch) {
            return res.status(401).json({ message: "Password Incorrect!" });
          } else {
            const usertoken = {
              email: finduser.email,
            };
            const token = jwt.sign(usertoken, JET_SECRET);
            const  { email }  = finduser;
            res.json({ token,email,message: "You have successfuly Logged In!"});
          }
        }
    } catch (error) {
      res.status(200).json({
        message: "somthing went wrong",
      });
    }
  });

  router.post("/getuser",async(req,res) => {
    try
    {
      const email = req.body.email;
      const data = await User.findOne({ where: { email:email} });
      if(data)
    {
      return res.status(200).json({
        data
      })
    }
    else
    {
      return res.status(400).json({
        error:'something went wrong'
      })
    }
    }
    catch(error)
    {
      res.status(200).json({
        message: "somthing went wrong",
      });
    }
  })

module.exports = router;
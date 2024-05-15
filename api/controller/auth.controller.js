import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
     const { username, email, password } = req.body;
     // HASH THE PASSWORD
     try {
          const hashPassword = await bcrypt.hash(password, 10);
          console.log(hashPassword);
          // CREATE A NEW USER AND SAVE IT INTO DB
          const newUser = await prisma.user.create({
               data: {
                    username,
                    email,
                    password: hashPassword
               }
          })

          console.log(newUser);
          res.status(201).json({ message: "user created succesfully" });
     } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Failed to create an user!" });
     }

}

export const login = async (req, res) => {
     const { username, password } = req.body;

     try {

          // check if user is exsits
          const user = await prisma.user.findUnique({
               where: { username }
          })

          if (!user) return res.status(401).json({ message: "invalide credential!" });

          // check if the password is correct?
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return res.status(401).json({ message: "invalide credential!" });

          // generate a cookie token and send it to the user
          // res.setHeader("set-cookie", "test=" + "myValue").json({message: "sucess"});

          const age = 1000 * 60 * 60 * 24 * 7;
          const token = jwt.sign({
               id: user.id
          }, process.env.JWT_SECRET_KEY,
          {expiresIn: age}
          );


          res.cookie("Token", token, {
               httpOnly: true, // client site javascript can't accesee
               // secure : true (for http server but for now we use localhost)
               maxAge: age,
          }).status(200).json("Login successful");

     } catch (err) {
          console.log(err);
          res.status(500).json({ message: "failed to login" });
     }
}

export const logout = (req, res) => {
     //db operations
     res.clearCookie("Token").status(200).json({message : "Logout successfuly"});
}
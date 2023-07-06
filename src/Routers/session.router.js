import { Router } from "express";
import { JWT_COOKIE_NAME } from "../utils.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get("/register", (req, res) => {
  res.render("sessions/register");
});

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/session/failureRegister",
  }),
  async (req, res) => {
    res.redirect("/session/login");
  }
);

sessionRouter.get("/failureRegister", (req, res) => {
  res.send({ error: "failed!" });
});

sessionRouter.get("/login", (req, res) => {
  res.render("sessions/login");
});

sessionRouter.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/session/failLogin' }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Invalid creadentials" });
    }

    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect("/products");
  }
);

sessionRouter.get("/failLogin", (req, res) => {
  res.send({ error: "Fail login" });
});

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

sessionRouter.get('/logout', (req, res) => {
 res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login')
});




export default sessionRouter;

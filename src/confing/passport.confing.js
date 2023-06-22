import passport from "passport";
import local from "passport-local";
import passport_jwt, { ExtractJwt } from "passport-jwt";
import UserModel from "../dao/models/user.model.js";
import {
  createHash,
  isValidPassword,
  generateToken,
  extractCookie,
} from "../utils.js";
import { JWT_PRIVATE_KEY } from "../utils.js";
import GitHubStrategy from "passport-github2";

const LocalStrategy = local.Strategy
const JWTStrategy = passport_jwt.Strategy

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.59289bd6a5c20a6c",
        clientSecret: "dc88612a8a126ed14a7e460176ad190a72546c9a",
        callbackURL: "http://localhost:8080/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await UserModel.findOne({ email: profile._json.email });
          if (user) return done(null, user);
          const newUser = await UserModel.create({
            first_name: profile._json.name,
            email: profile._json.email,
            rol: profile._json.type,
          });
          return done(null, newUser);
        } catch (err) {
          return done("Error to login with github" + err);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
          const user = await UserModel.findOne({ email: username });
          if (user) {
            console.log("User already exists!");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          };
          if (email === "adminCoder@coder.com") {
            newUser.rol = "admin";
          } else {
            newUser.rol = "user";
          }

          const result = await UserModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error en passport REGISTER " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (!user) {
            console.log("User does not exists");
            return done(null, user);
          }

          if (!isValidPassword(user, password)) return done(null, false);
          const token = generateToken(user)
          user.token= token

          return done(null, user);
        } catch (error) {
          done("error");
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        sercretOrKey: JWT_PRIVATE_KEY
      },
      async (jwt_payload, done) => {
        done(null, jwt_payload);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;

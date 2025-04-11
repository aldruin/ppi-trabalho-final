import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";
import routes from "./routes/index.js";
import session from "express-session";
import autenticar from "./middlewares/autenticar.js";
import UserController from "./controllers/UserController.js";


const app = express();

app.use(session({
  secret: "s3gr3d0",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", autenticar, (req, res) => {
  res.redirect("/login.html");
});

//login routes

app.get('/verificar-sessao', (req, res) => {
  if (req.session && req.session.autenticado) {
    return res.json({ autenticado: true });
  }
  return res.json({ autenticado: false });
});

app.get("/login", (req, res) => {
  if (req.session?.autenticado) {
    return res.redirect('/');
  }
  res.render('login');
})

app.post("/login", UserController.login);

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao finalizar a sessão' });
    }
    res.redirect('/');
  });
});

app.use(express.static('src/frontend/public'));

app.use("/private", autenticar, express.static('src/frontend/private'));

routes(app);

app.use(pageNotFoundHandler);

app.use(errorHandler);

export default app;
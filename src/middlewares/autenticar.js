export default function autenticar( req, res, next){
  console.log("Verificando autenticação:", req.session);
  if (req.session?.autenticado) {
    return next();
  } else {
    if (!req.originalUrl.includes('/favicon.ico')) {
      req.session.redirectTo = req.originalUrl;
    }
    res.redirect('/login.html');
  }
}

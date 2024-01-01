import bodyParser from "body-parser";

export default async function expressLoaders(app) {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `public, max-age=10`);
    next();
  });
  // app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  return app;
}

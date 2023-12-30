import express from "express";
import apiRouter from "./api/index.js";

export function init(app) {
  app.get("/", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send({ title: "Hello world!" });
  });
  app.use("/api", apiRouter);
}

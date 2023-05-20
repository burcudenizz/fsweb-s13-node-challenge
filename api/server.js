const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;

/* 

1-express import edildi.
2-server expresse bağlandı.
3-server.use(express.json()); ile serverda json formatına dönüştürüldü.
7-projectrouter import edildi.
8-server.use("/api/projects", projectRouter); ile url path tanımlandı.

*/

// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");

//tüm projects datası alındı.
router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectsModel.get(req.params.id);
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/api/projects/:id", async (req, res, next) => {});
router.post("/api/projects", async (req, res, next) => {});
router.put("/api/projects/:id", async (req, res, next) => {});
router.delete("/api/projects/:id", async (req, res, next) => {});
router.get("/api/projects/:id/actions", async (req, res, next) => {});
module.exports = router;

/*

9-router express.Router() ile tanımlandı. 
10-project-routera ilk olarak tüm projeler çekildi.router.get() ile
11-Bu işlem yapılırken project-modelde tanımlanan get() fonksiyonu kullanıldı.
12-Tüm crud fonkstonları tanımlandı.
13-middleware olarak id ve payload doğrulama yapmaya karar verildi.

*/

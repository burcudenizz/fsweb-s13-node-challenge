// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");
const middleware = require("./projects-middleware");

//tüm projects datası alındı.
router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectsModel.get(req.params.id);
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

//istenen id'ye sahip project datası alındı.
router.get("/:id", middleware.validateId, async (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

//verilen keylere sahip bir proje datası post edildi.
router.post("/", middleware.validatePayload, async (req, res, next) => {
  try {
    let project = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    };

    const insertedProject = await projectsModel.insert(project);
    res.status(201).json(insertedProject);
  } catch (error) {
    next(error);
  }
});

//verilen id'ye sahip project datası güncellendi.
router.put(
  "/:id",
  middleware.validateId,
  middleware.validatePayload,
  async (req, res, next) => {
    try {
      let project = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      };

      const updatedProject = await projectsModel.update(req.params.id, project);

      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);
//verilen id'ye sahip project datası silindi.
router.delete("/:id", middleware.validateId, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı." });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", middleware.validateId, async (req, res, next) => {
  try {
    const projectActions = await projectsModel.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/*

9-router express.Router() ile tanımlandı. 
10-project-routera ilk olarak tüm projeler çekildi.router.get() ile
11-Bu işlem yapılırken project-modelde tanımlanan get() fonksiyonu kullanıldı.
12-Tüm crud fonkstonları tanımlandı.
13-middleware olarak id ve payload doğrulama yapmaya karar verildi.
16-id gerektiren routelar için id'yi check eden middleware eklendi.
*** get ve delete fonksiyonlarında direkt modeldeki remove ve get fonksiyonları kullanılır.

*/

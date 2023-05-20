// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const middleware = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const allActions = await actionsModel.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", middleware.validateActionId, (req, res, next) => {
  try {
    res.json(req.currentAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.validateActionPayload, async (req, res, next) => {
  try {
    let action = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed,
    };

    const insertedAction = await actionsModel.insert(action);
    res.status(201).json(insertedAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  middleware.validateActionId,
  middleware.validateActionPayload,
  async (req, res, next) => {
    try {
      let action = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed,
      };

      const updatedAction = await actionsModel.update(req.params.id, action);
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", middleware.validateActionId, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

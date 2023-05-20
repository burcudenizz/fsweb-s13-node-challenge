// eylemlerle ilgili ara katman yazılımları yazın

const actionsModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    const isExistAction = await actionsModel.get(req.params.id);
    if (!isExistAction) {
      res.status(404).json({ message: "Girillen id'li action mevcut değil." });
    } else {
      req.currentAction = isExistAction;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateActionPayload(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;
    if (
      typeof project_id !== "number" ||
      !description ||
      !notes ||
      project_id <= 0
    ) {
      res.status(400).json({ message: "Zorunlu alanlar eksik." });
    } else {
      const existProject = await projectModel.get(project_id);
      if (!existProject) {
        res.status(400).json({ message: "Geçersiz proje id'si." });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateActionId, validateActionPayload };

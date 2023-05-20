// projects ara yazılımları buraya
const projectsModel = require("./projects-model");

async function validateId(req, res, next) {
  try {
    const isExistProject = await projectsModel.get(req.params.id);

    if (!isExistProject) {
      res.status(404).json({ message: "Girilen id'li proje mevcut değil." });
    } else {
      req.currentProject = isExistProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePayload(req, res, next) {
  try {
    const name = req.body.name;
    const description = req.body.description;

    // destructuring:  const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ message: "Zorunlu alanlar eksik." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateId,
  validatePayload,
};

/*

14- proje idsi ve payloadı doğrulama fonksiyonları yazıldı.
15-fonksyionlar export edildi.

*/

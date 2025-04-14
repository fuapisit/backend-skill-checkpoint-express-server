export const validateCreateData = (req, res, next) => {
    const { title, description, category } = req.body;
  
    if (
      typeof title !== "string" || title.trim() === "" ||
      typeof description !== "string" || description.trim() === "" ||
      typeof category !== "string" || category.trim() === ""
    ) {
      return res.status(400).json({
        message: "Invalid request data.",
      });
    }
  
    next();
  };
  
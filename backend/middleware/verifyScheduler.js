export const verifyScheduler = (req, res, next) => {
  const secret = req.header("x-secret-key");

  if (!secret || secret !== process.env.SCHEDULER_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
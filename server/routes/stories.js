const router = require("express").Router();
const needle = require("needle");

const UPSTREAM = "https://actually-relevant-api.onrender.com/api/stories";

router.get("/", async (req, res) => {
  try {
    const resp = await needle("get", UPSTREAM, { json: true });
    if (resp.statusCode !== 200) {
      return res.status(resp.statusCode || 502).json({
        message: "News service returned an error",
      });
    }
    res.json(resp.body);
  } catch (e) {
    res.status(502).json({ message: "Failed to fetch stories" });
  }
});

module.exports = router;

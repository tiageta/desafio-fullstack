require("dotenv").config();
const customExpress = require("./config/custom-express");

const PORT = process.env.PORT || 3000;

const app = customExpress();
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

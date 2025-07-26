const express = require('express');
const cors = require('cors');
const chefsEdgeRoute = require('./routes/chefsEdgeRoute');
const knifewearRoute = require('./routes/knifeWearRoute');
const compareRoute = require('./routes/compareRoutes');
const compareLinkRoute = require('./routes/compareLinkRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chefs-edge', chefsEdgeRoute);
app.use('/api/knifewear', knifewearRoute);
app.use('/api/compare', compareRoute);
app.use('/api/compare-link', compareLinkRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

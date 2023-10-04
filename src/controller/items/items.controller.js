const { asyncErrorHandler } = require('../../utils/errorController');
const { Items } = require('./items.model');

const getItemsController = asyncErrorHandler(async (req, res, next) => {
  const result = await Items.aggregate([
    { $skip: 29 },
    { $limit: 2 },
    { $project: { title: 1, _id: 0 } },
  ]);
  res.send(result);
});

module.exports = {
  getItemsController,
};

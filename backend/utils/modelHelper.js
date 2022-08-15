function getMaxOrder(entityList) {
  return entityList.length > 0
    ? Math.max(...entityList.map((e) => e.order))
    : -1;
}

module.exports = { getMaxOrder };

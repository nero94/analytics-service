const groupByRates = (events) => {
  const key = 'userId';
  return events.reduce(function (rv, x) {
    const val = x[key];
    if (!val) return rv;
    (rv[val] = rv[val] || []).push(x);
    return rv;
  }, {});
};

module.exports = (pageViewEvents) => {
  const grouped = groupByRates(pageViewEvents);
  return Object.keys(grouped).map((userId) => ({
    userId,
    rate: grouped[userId].length,
    events: grouped[userId],
  })).sort((a, b) => b.rate - a.rate);
};

const grouper = array => {
  const grouped = array.reduce((acc, item) => {
    const key = item.condition;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return Object.keys(grouped).map(key => {
    const sorted = [...grouped[key]].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    return {
      condition: key,
      items: sorted,
      latestUpdate: sorted.map(a => a.createdAt)[0],
    };
  });
};

export default grouper;

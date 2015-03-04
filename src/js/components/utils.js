const flattenTopics = function(topicsObj) {
  var topics = [];

  for (let key in topicsObj) {
    let topic = topicsObj[key];
    topics.push({
      id: key,
      discussion: topic.discussion,
      name: topic.name
    });
  }
  return topics;
}

module.exports = {
  "flattenTopics": flattenTopics
}

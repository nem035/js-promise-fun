function getJSON(url) {
  return get(url).then(JSON.parse);
}

function addStoryToDOM(story) {
  $storyTitle.prepend(story.heading);
  return story;
}

function extractChapterURLs(story) {
  return story.chapterUrls;
}

function addChapterContentsToDOM(chapter) {
  $chapterContents.append(chapter.html);
}

function getAndRenderChaptersInOrder(urls) {
  return urls.map(getJSON)
    .reduce(function(chain, promise) {
      return chain
        .then(function() {
          return promise;
        })
        .then(addChapterContentsToDOM)
        .catch(function(err) {
          console.error(err);
        });
    }, Promise.resolve());
}

$btnLoad.click(function() {
  $progress.show();
  $btnLoad.parent().remove();
  getJSON('./data/story.json')
    .then(addStoryToDOM)
    .then(extractChapterURLs)
    .then(getAndRenderChaptersInOrder)
    .then(function() {
      $progress.hide();
      $chapterContents.addClass('loaded');
    });
});

var $progress = $('#progress');
var $storyTitle = $('#story-title');
var $chapterContents = $('#chapter-contents');
var $chapterTitles = $('#chapter-titles');
var $btnLoad = $('#btn-load');

$progress.hide();

$chapterTitles.click(function(evt) {
  $('a').removeClass('active');
  $(evt.target).addClass('active');
});

function scrollHandler() {
  var prevScroll = 0;
  return function() {
    var $this = $(this);
    var currentScroll = $this.scrollTop();
    if (currentScroll === 0 || (currentScroll > prevScroll)) {
      $this.removeClass('up').addClass('down');
    } else {
      $this.removeClass('down').addClass('up');
    }
    prevScroll = currentScroll;
  };
}

$chapterContents.scroll(scrollHandler());

function addChapterAnchorsToDOM(i) {
  var a = $('<a></a>');
  a.attr('href', '#chapter-' + i);
  a.attr('class', 'collection-item');
  a.text('Chapter ' + i);
  $chapterTitles.append(a);
}

var progressTemplate = `
<div class="preloader-wrapper small active">
  <div class="spinner-layer spinner-green-only">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div><div class="gap-patch">
      <div class="circle"></div>
    </div><div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
</div>
`;

function findChapterAnchor(chapterId) {
  return $('a[href="#chapter-' + chapterId + '"]');
}

function extractChapterId(url) {
  return url.replace(/\D/g,'');
}

function showProgress(url) {
  var chapterId = extractChapterId(url);
  var elem;
  if (chapterId.length > 0) {
    elem = findChapterAnchor(chapterId);
  } else {
    elem = $storyTitle;
  }
  elem.addClass('yellow accent-1')
    .append($(progressTemplate));
}

function hideProgress(url) {
  var chapterId = extractChapterId(url);
  var elem;
  if (chapterId.length > 0) {
    elem = findChapterAnchor(chapterId);
  } else {
    elem = $storyTitle;
  }
  elem.removeClass('yellow accent-1')
    .find('.preloader-wrapper')
    .remove();
}

function showError(url) {
  var chapterId = extractChapterId(url);
  var elem;
  if (chapterId.length > 0) {
    elem = findChapterAnchor(chapterId);
  } else {
    elem = $storyTitle;
  }
  elem.removeClass('yellow accent-1')
    .addClass('red-text error disabled')
    .click(function(e) {
      e.preventDefault();
    })
    .find('.preloader-wrapper')
    .remove();
}

[1, 2, 3, 4, 5].forEach(addChapterAnchorsToDOM);

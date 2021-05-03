$(document).ready(function () {
  var headerTitle = $("meta[name='header-title']").attr('content');

  $('#header>a').after('<div id="header-title"></div>');
  $('#header-title').text(headerTitle);
  $('#header-title').css({
    'font-family': 'Honeywell Cond Web Extrabold',
    'font-size': '2em',
    'padding-left': '290px',
    'padding-top': '32px',
    color: '#ffffff',
  });

  $('#responsiveHeader>a').after('<div id="responsive-header-title"></div>');
  $('#responsive-header-title').text(headerTitle);
});

$('#logout-button').click(function () {
  $.ajax({
    type: 'POST',
    url: '/logout',
    data: {},
    success: function (data) {
      if (data.success) {
        window.location.href = '/';
      } else {
        alert('Something went wrong');
      }
    }
  });
});

$('#prev-button').click(function () {
  var page = parseInt(window.location.search.split('?')[1].split('=')[1]) - 1;
  window.location.href = '/?page=' + page;
});

$('#next-button').click(function () {
  var page = parseInt(window.location.search.split('?')[1].split('=')[1]) + 1;
  window.location.href = '/?page=' + page;
});
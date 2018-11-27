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
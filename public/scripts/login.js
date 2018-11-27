$('#register-button').click(function () {
  window.location.href = '/register';
});

$('#login-button').click(function () {
  var email = $('#email')[0].value;
  var password = $('#password')[0].value;

  $.ajax({
    type: 'POST',
    url: '/login',
    data : {'email': email, 'password': password},
    success: function (data) {
      if (data.success) {
        window.location.href = '/';
      } else if (data.error) {
        alert(data.error);
      } else {
        alert('There was an error');
        console.log(data);
      }
    }
  });
});
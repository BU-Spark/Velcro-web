$('#register-button').click(function () {
  const firstName = $('#first-name')[0].value;
  const lastName = $('#last-name')[0].value;
  const email = $('#email')[0].value;
  const password = $('#password')[0].value;
  const confirmPassword = $('#confirm-password')[0].value;

  var inputs = [firstName, lastName, email, password, confirmPassword];

  // check if all fields are filled out
  for (var i = 0; i < inputs.length; i++) {
    switch (i) {
      case 0:
        if (inputs[i] == '') {
          return alert('Please enter your first name');
        }
        break;

      case 1:
        if (inputs[i] == '') {
          return alert('Please enter your last name');
        }
        break;

      case 2:
        if (inputs[i] == '') {
          return alert('Please enter your password');
        }
        break;

      case 3:
        if (inputs[i] == '') {
          return alert('Please confirm your password');
        }
        break;
    }
  }

  // confirm if passwords match
  if (!(password === confirmPassword)) {
    return alert('Your passwords do not match');
  }

  // send registration into to backend
  $.ajax({
    type: 'POST',
    url: '/register',
    data: {'firstName':firstName, 'lastName':lastName, 'email':email, 'password':password},
    success: function (data) {
      if (data.error) {
        alert(data.error);
      }
      if (data.success) {
        // window.location.href = '/';
      }
    }
  });
});
function validate_mail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function contact_success() {
  alert(CONTACT_SUCCESS);
}

function contact_error(jqXHR, exception) {
  if (jqXHR.status != 200) {
    alert(CONTACT_ERROR);
  } else {
    contact_success();
  }
}

function contact_complete(jqXHR, exception) {
  $('#contact-send').html(CONTACT_SEND);
  $('#contact-send').click( function(e) {e.preventDefault(); contact_form(); return false; } );
}

function contact_form() {
  var channel = $("#channel_field").val();
  var name = $("#name_field").val().trim();
  var email = $("#email_field").val().trim();
  var phone = $("#phone_field").val().trim();
  var message = $("#message_field").val().trim();

  if (channel === "") {
    alert(CONTACT_MISSING_CHANNEL);
    return;
  }

  if (name === "") {
    alert(CONTACT_MISSING_NAME);
    return;
  }

  if (email === "") {
    alert(CONTACT_MISSING_EMAIL);
    return;
  }

  if (! validate_mail(email)) {
    alert(CONTACT_INVALID_EMAIL);
    return;
  }

  if (phone === "") {
    alert(CONTACT_MISSING_PHONE);
    return;
  }

  if (message === "") {
    alert(CONTACT_MISSING_MESSAGE);
    return;
  }

  data = {
    "channel": channel,
    "name": name,
    "email": email,
    "phone": phone,
    "message": message
  };

  // double click prevention
  $('#contact-send').html(CONTACT_SENDING);
  $('#contact-send').off("click");

  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/mail",
    data: JSON.stringify(data),
    dataType: "json",
    success: contact_success,
    error: contact_error,
    complete: contact_complete
  });
}

$( document ).ready(function() {
  $('#contact-send').click( function(e) {e.preventDefault(); contact_form(); return false; } );
});

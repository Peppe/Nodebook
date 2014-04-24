
// DOM ready
$(document).ready(function() {
    populateTable();
    $('#users tbody').delegate('tr', 'click', select);
    $('#button-add-user').on('click', addUser);
});

function populateTable(){
  var tableContent = '';
  console.log('adding rows to table')
  $.getJSON('/users', function(data){
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td>' + this.first + '</td>';
      tableContent += '<td>' + this.last + '</td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td>' + this.phone + '</td>';
      tableContent += '</tr>';
      $('#users tbody').html(tableContent);
    });
  });
}

function select(event){
  console.log('changing selection');
  $('.info').removeClass('info')
  $(this).addClass('info');
}

function addUser(event){
  event.preventDefault();
  console.log('add user clicked');

  var error = false;
  $('#form-add-user input').each(function(index, val) {
    if($(this).val()) {
      $(this).parent().removeClass("has-error")
    } else {
      error = true;
      $(this).parent().addClass("has-error")
    }
  });
  if(!error){
    console.log('sending message');
    var user = {
      'first': $('#form-add-user input#first').val(),
      'last': $('#form-add-user input#last').val(),
      'phone': $('#form-add-user input#phone').val(),
      'email': $('#form-add-user input#email').val()
    }
    $.ajax({
      type: 'POST',
      data: user,
      url: '/add',
      dataType: 'JSON'
    }).done(function( response ) {
      console.log('message sent');
      if (response.msg === '') {
        console.log('message sent successfully');
        $('#addUser fieldset input').val('');
        populateTable();
      }
      else {
        console.log('message failed');
        alert('Error: ' + response.msg);
      }
    });
  } else {
    console.log('ERROR!1');
  }
}

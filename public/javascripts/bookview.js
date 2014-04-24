
var currentPerson = null;
var persons = [];
// DOM ready
$(document).ready(function() {
    populateTable();
    $('#persons tbody').delegate('tr', 'click', select);
    $('#button-add-user').on('click', addUser);
    $('#button-delete-person').on('click', deletePerson);

});

function populateTable(){
  var tableContent = '';
  console.log('adding rows to table')
  $.getJSON('/persons', function(data){
    persons = data;
    $.each(data, function(){
      console.log("id: " + this._id);
      tableContent += '<tr rel="'+ this._id + '">';
      tableContent += '<td>' + this.first + '</td>';
      tableContent += '<td>' + this.last + '</td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td>' + this.phone + '</td>';
      tableContent += '</tr>';
    });
    $('#persons tbody').html(tableContent);
  });
}

function select(event){
  console.log('changing selection');
  $('.info').removeClass('info')
  $(this).addClass('info');
  currentPerson = $(this).attr('rel');
  // Get Index of object based on id value
  var arrayPosition = persons.map(function(arrayItem) { return arrayItem._id; }).indexOf(currentPerson);
  // Get our User Object
  var thisPerson = persons[arrayPosition];

  $('#form-add-user input#first').val(thisPerson.first);
  $('#form-add-user input#last').val(thisPerson.last);
  $('#form-add-user input#phone').val(thisPerson.phone);
  $('#form-add-user input#email').val(thisPerson.email);
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
    var restMethod = '/add';
    if(currentPerson != null){
      user['_id']=currentPerson;
      restMethod = '/update'
    }
    $.ajax({
      type: 'POST',
      data: user,
      url: restMethod,
      dataType: 'JSON'
    }).done(function( response ) {
      console.log('message sent');
      if (response.msg === '') {
        console.log('message sent successfully');
        $('#form-add-user fieldset input').val('');
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

function deletePerson(event){
  event.preventDefault();
  console.log('delete user clicked');
  $.ajax({
    type: 'POST',
    url: '/delete/'+currentPerson,
    dataType: 'JSON'
  }).done(function( response ) {
    console.log('message sent');
    if (response.msg === '') {
      console.log('message sent successfully');
      populateTable();
    }
    else {
      console.log('message failed');
      alert('Error: ' + response.msg);
    }
  });
}

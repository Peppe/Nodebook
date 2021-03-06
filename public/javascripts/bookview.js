
var currentPerson = null;
var persons = [];
// DOM ready
$(document).ready(function() {
    populateTable();
    $('#persons tbody').delegate('tr', 'click', select);
    $('#button-add-user').on('click', addUser);
    $('#button-delete-person').on('click', deletePerson);
    $('#button-new-person').on('click', newPerson);

});

function populateTable(){
  var tableContent = '';
  console.log('adding rows to table')
  $.getJSON('/persons', function(data){
    persons = data;
    $.each(data, function(){
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
      if (response.msg === '') {
        $('#form-add-user fieldset input').val('');
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
}

function deletePerson(event){
  event.preventDefault();
  $.ajax({
    type: 'DELETE',
    url: '/delete/'+currentPerson,
    dataType: 'JSON'
  }).done(function( response ) {
    if (response.msg === '') {
      populateTable();
    }
    else {
      alert('Error: ' + response.msg);
    }
  });
}

function newPerson(event){
  event.preventDefault();
  currentPerson = null;
  $('.info').removeClass('info')
  $('#form-add-user input#first').val('');
  $('#form-add-user input#last').val('');
  $('#form-add-user input#phone').val('');
  $('#form-add-user input#email').val('');
  $('#form-add-user input#first').focus();
}


// DOM ready
$(document).ready(function() {
    populateTable();
    $('#users tbody').delegate('tr', 'click', select);
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

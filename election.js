document.addEventListener("DOMContentLoaded", function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(responseData){
    var candidates = document.querySelector('#list');
    responseData.candidates.forEach(function(candidate){
      var li = document.createElement('li');
      li.innerHTML =  `<p>Name: ${candidate.name}<br>Votes: ${candidate.votes}</p>`;
      list.append(li);
      var form = document.createElement('form');
      form.innerHTML = '';
      li.append(form);
    })
  })

});

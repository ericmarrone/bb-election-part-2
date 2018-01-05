document.addEventListener("DOMContentLoaded", function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(responseData){
    var candidates = document.querySelector('#list');
    responseData.candidates.forEach(function(candidate){
      var liTag = document.createElement('li');
      liTag.innerHTML =  `<p>Name: ${candidate.name}<br><span>Votes: ${candidate.votes}</span></p>`;
      list.append(liTag);
      var formTag = document.createElement('form');
      formTag.innerHTML = '';
      liTag.append(formTag);
      formTag.method = 'post';
      formTag.action = 'https://bb-election-api.herokuapp.com/vote';
      var hiddenField = document.createElement('input');
      var submitButton = document.createElement('input');
      hiddenField.setAttribute('type', "hidden");
      hiddenField.setAttribute('name', "name");
      hiddenField.setAttribute('value', candidate.name);
      submitButton.type = "submit";
      submitButton.value = "Vote";
      formTag.append(hiddenField);
      formTag.append(submitButton);

      formTag.addEventListener('submit', function(e){
        e.preventDefault();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: {name: this.querySelector('input[type=hidden]').value},
          dataType: 'JSON'
        }).done(function(){
          console.log('Vote submitted!');
          var refreshButton = document.querySelector('button');
          refreshButton.innerText = 'Update Vote count';
          refreshButton.addEventListener('click', function(e){
            $.ajax({
              url: 'https://bb-election-api.herokuapp.com/',
              method: 'GET',
              dataType: 'JSON'
            }).done(function(data){
              var updateVotes = document.getElementsByTagName('span')
              for (var i=0; i<data.candidates.length; i++){
                updateVotes[i].innerText = 'Votes: ' + data.candidates[i].votes;
              };
            });
          });


        }).fail(function(){
          console.log('Vote submission failed!');

        })
      })
    })
  })

});

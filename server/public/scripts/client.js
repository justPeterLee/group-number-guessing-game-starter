$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit').on('click', submit);
  $('#change-num').on('click', changeNum)
}
let rounds = 1;
function submit(){
  console.log($('#input-1').val());
  console.log($('#input-2').val());
  
  rounds ++;
  $('#rounds').text(`guess #${rounds}`)
  let guesses = {
    guess1 : $('#input-1').val(),
    guess2 : $('#input-2').val()
  };

  $.ajax({
    method: 'POST',
    url:'/',
    data: guesses
  }).then(function(response){
    console.log(response);
    renderUpdate(response)
  }).catch(function(response){
    console.log('error, ', response);
  });
}

function renderUpdate(data){
  for(let i = 0; i<data.length; i++){
    if(data[i].update == 'correct'){
      $(`
        <h1> ${data[i].guesser} is the WINNER !!! </h1>
      `).appendTo('#screen-winner');
    }else{
      $(`
        <h1> ${data[i].guesser} is ${data[i].update} than the correct number </h1>
      `).appendTo('#history');
    }
    
  }
  
}


function changeNum(){
  let newNum = {num:Math.floor(Math.random() * (1 + 25 - 1) + 1)}

  $.ajax({
    method:"POST",
    url:'/generate',
    data: newNum
  }).then(function(response){
    console.log('the new number has been generated');
  }).catch(function(response){
    console.log('failed to generate new number, ', response)
  })
}
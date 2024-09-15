const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    //$('#clickMeButton').click(() => {
      //  clickMe();
    //})
    $('#clickMeButton').click(function(){
    $.ajax({url: "http://localhost:3040/addTwoNumber", success: function(result){
        alert("Thanks for the bid")
    }});
    });
});
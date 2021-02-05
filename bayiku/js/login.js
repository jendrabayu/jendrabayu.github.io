/*var attempt = 3; // Variable to count number of attempts.*/
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password-field").value;
if ( username != "bayiku" && password != "bayiku"){
alert("Gagal");
return false;
}

/*else{
attempt --;// Decrementing by one.
alert("Kesempatanmu tinggal "+attempt+" percobaan;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password-field").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
*/
}
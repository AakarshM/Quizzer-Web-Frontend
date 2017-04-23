/*

HTML FORM TAKEN FROM WEB PAGE

*/

/*$(document).ready(function() {
    $("#b1").click(function(){
        alert("button");
    });
});
*/

$(document).ready(function(){
    $('#login_form').on('submit', function(e){
        e.preventDefault();
        console.log(e);
        var uname = $('#login_form').serializeArray()[0].value;
        var pword = $('#login_form').serializeArray()[1].value;
        console.log(uname);
        axios.post("/teachers/login", {
          email: uname,
          password: pword
        })
          .then(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
            var headerTokenObject = response.headers;
            var headerToken = headerTokenObject["x-auth"].toString();
            console.log(headerToken);
            sessionStorage.setItem("authHeader", headerToken);
            //console.log(sessionStorage.getItem("authHeader").toString());
            window.location.href="/courses.html";
          }).catch(function (error) {
              alert(error.response.status + ": " + error.response.statusText);
              });

    });
});

$(document).ready(function(){
    $('#Register').click(function(){
       window.location.href="/signup.html";
    });
  });


function GitHub(){
  axios.get('https://api.github.com/users/' + 'AakarshM')
    .then(function(response){
      console.log(response.data); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200
    });

}

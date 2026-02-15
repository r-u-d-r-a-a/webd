var validEmail = false;
var validUserName = false;
var validPassword = false;
var validConfirmPassword = false;


var regExEmail = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
var regExInput =/^[\w&.\-]*$/;


$(document).ready(
	() =>
    {
  		$("#email").keyup(
            (e)=>{
                validate(e.target);
            }
        );

        $("#username").keyup(
            (e)=>{
                validate(e.target);
            }
        );

        $("#password").keyup(
            (e)=>{
                validate(e.target);
            }
        );

        $("#confirmpassword").keyup(
            (e)=>{
                validate(e.target);
            }
        );
});




const validate = (e) => 
{
    //console.log(e);
    var type = e.id;
    var value = e.value;
    var em = "error_" + type;

    //console.log(type + value);

    switch(type)
    {
        case "email":
            if (value.trim() == "") {
                $("#" + em).show();
                $("#" + em).html("Email id cannot be empty");
    
                validEmail = false;
                submitted();
                return;
            }
             if (!value.trim().match(regExEmail)) {
                $("#" + em).show();
                $("#" + em).html("Please enter northeastern email id");
                
                validEmail = false;
                submitted();
                return;
            }
            
                $("#" + em).hide();

                validEmail = true;
                submitted();
                break;

        case "username":
            if(value.trim()=="")
            {
                $("#" + em).show();
                $("#" + em).html("Username cannot be empty");
    
                validUserName = false;
                submitted();
                return;
            }
             if(value.trim().length<3 || value.trim().length>10)
            {
                $("#" + em).show();
                $("#" + em).html("Must be 3 to 10 characters");

                validUserName = false;
                submitted();
                return;
            }
            if(!value.trim().match(regExInput))
            {
                $("#" + em).show();
                $("#" + em).html("No special characters");

                validUserName = false;
                submitted();
                return;
            }
            
                $("#" + em).hide();

                validUserName = true;
                $("a").attr("href", "calculator.html?name="+value);
                submitted();
            
            break;

        case "password":
            if(value.trim()=="")
            {
                $("#" + em).show();
                $("#" + em).html("Password cannot be empty");
    
                validPassword = false;
                submitted();
                return;
            }
            if(value.trim().length<3 || value.trim().length>10)
            {
                $("#" + em).show();
                $("#" + em).html("Must be 3 to 10 characters");

                validPassword = false;
                submitted();
                return;
            }
            if(!value.trim().match(regExInput))
            {
                $("#" + em).show();
                $("#" + em).html("No special characters");

                validPassword = false;
                submitted();
                return;
            }
            
                $("#" + em).hide();

                validPassword = true;
                submitted();
            
            break;

        case "confirmpassword":
            var password = $("#password").val();
            if(value != (password))
            {
                $("#" + em).show();
                $("#" + em).html("Password does not match");

                validConfirmPassword = false;
                submitted();
                return;
            }
                
                $("#" + em).hide();
                validConfirmPassword = true;
                submitted();

    }


}

const submitted = () =>
{
    if(validEmail==true && validUserName==true && validPassword==true && validConfirmPassword==true)
    {
        $("button").prop('disabled', false);
        return;
        
    }
    
        $("button").prop('disabled', true);
    
}
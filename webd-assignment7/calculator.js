
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const username = urlParams.get('name')
console.log(username);


$(document).ready(() => {
    
    $("h2").html("Welcome " + username);

    const regExNumber = /^[0-9]+$/;

    var num1check = false, num2check = false;


    $(".number1").keyup(() => {
        console.log($(".number1").val());
        var num1 = $(".number1").val().trim().toLowerCase();

        if(!num1.match(regExNumber)){
            $("#error_number1").show();
            $(".number1").addClass("border-danger");
            num1check = false;
            toggleOp();
            if(num1.length == 0) $("#error_number1").html("Null value is not allowed");
            else $("#error_number1").html("Should be a number");
        }
        else if(!isFinite(num1)){
            $("#error_number1").show();
            $(".number1").addClass("border-danger");
            num1check = false;
            toggleOp();

            $("#error_number1").html("Number should not exceed MAX Value(Infinite check)");
        }
        else{

            

            $("#error_number1").hide();
            $(".number1").removeClass("border-danger");
            num1check = true;
            toggleOp();
        }
    });

    $(".number2").keyup(() => {
        var num2 = $(".number2").val().trim().toLowerCase();

        if(!num2.match(regExNumber)){
            $("#error_number2").show()
            $(".number2").addClass("border-danger");
            num2check = false;
            toggleOp();
            if(num2.length == 0) $("#error_number2").html("Null value is not allowed");
            else $("#error_number2").html("Should be a number");
        }
        else if(!isFinite(num2)){
            $("#error_number2").show()
            $(".number2").addClass("border-danger");
            num2check = false;
            toggleOp();

            $("#error_number2").html("Number should not exceed MAX Value(Infinite check)");
        }
        else{
            $("#error_number2").hide();
            $(".number2").removeClass("border-danger");
            num2check = true;
            toggleOp();
        }
    });

    var toggleOp = () =>{
        if(num1check == false || num2check == false){
            $(".calc").attr("disabled", true);
        }

        else {
            $(".calc").removeAttr("disabled");

        }
    }

    $("#add").click(
        (e)=>{
            calc(e.target);
        }
    )

    $("#subtract").click(
        (e)=>{
            calc(e.target);
        }
    )

    $("#multiply").click(
        (e)=>{
            calc(e.target);
        }
    )

    $("#divide").click(
        (e)=>{
            calc(e.target);
        }
    )

    
});

var calc = (op) =>{

    //console.log(op.id);

    switch(op.id){

        case "add":
            $("h4").html(parseInt($(".number1").val()) + parseInt($(".number2").val()));
            break;
        case "subtract":
            $("h4").html(parseInt($(".number1").val()) - parseInt($(".number2").val()));
            break;
        case "multiply":
            $("h4").html(parseInt($(".number1").val()) * parseInt($(".number2").val()));
            break;
        case "divide":
            $("h4").html(parseInt($(".number1").val()) / parseInt($(".number2").val()));
            break;
    }

    if(!isFinite(op.id)){
        
        $(".number3").val("Infinite Number");
    }
}

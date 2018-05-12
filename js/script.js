/*function getId() {
    var id = document.getElementById('id').value;
    id="https://api.github.com/"+id;

    /*var result = document.getElementById('result');

    result.innerHTML = id;*/
/*    $(function (){

        $.ajax({
            type: 'GET',
            url: id,
            success: function(data) {
                console.log('success',data);
            }
        });
    });
}

var button = document.getElementById('subButton');
button.addEventListener('click', getId, false);*/

$("#subButton").click( function {
    event.preventDefault();
    var id = $("id").val();
    id = "https://api.github.com/users"+id;
    $.ajax({
        type: 'GET',
        url: id,
        success: function(data) {
            alert('data');
        }
    });

});


$(function(){
    $('#subButton').on('click', function(e){
        event.preventDefault();
        $('#result').html('<div class="loader"><img src="../images/loading.gif" alt="loading..."></div>');
        var id = $('#id').val();
        var requri   = 'https://api.github.com/users/'+id;
        var repouri  = 'https://api.github.com/users/'+id+'/repos'

        requestJSON(requri, function(json) {

            if(json.message == "Not Found" || username == '') {
                $('#result').html("<h2>No User Info Found</h2>");
            }
            
            else {
                var fullname   = json.name;
                var username   = json.login;
                var aviurl     = json.avatar_url;
                var profileurl = json.html_url;
                var location   = json.location;
                var followersnum = json.followers;
                var followingnum = json.following;
                var reposnum     = json.public_repos;
                
                if(fullname == undefined) { fullname = username; }

                var output = '<div>Fullname:'+fullname+'</div>';
                output = output + '<div>Username:'+username+'</div>';

                $('#result').html(output);
            }
        });
    });
    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});
    


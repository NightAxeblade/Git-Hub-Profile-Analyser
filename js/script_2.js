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
                //window.scrollTo(0,1000);
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
                var company = json.company;
                var blog = json.blog;
                
                if(fullname == undefined) { fullname = username; }
                if(location == null) {location = 'undisclosed location';}
                if(company == null) {company = 'Not employed as of now';}
                if(blog == null) {blog = 'Not writing as of now';}

                var output = '<div class="mainresult" class="clearfix">';
                output = output + '<div class="avatardiv"> <img src ="' + aviurl + '" class="avatar"> </div>';
                output = output + '</br></br><div class="rightofav"></br><b> Followers:</b> ' + followersnum + '</br><b> Following:</b> ' + followingnum + '</br><b>Profile:</b> <a class="link" href=' + profileurl + '>' + profileurl + '</a></div>';
                output = output + '</br></br></br></br><div class="username"> <a class="link" href='+profileurl+'>'+username+'</a></div>';
                output = output + '<div class="name">'+fullname+'</div>';
                output = output + '</br></br><div class="info"> <b>Based in</b>: ' + location + '<hr size=1 color="white"><b>Part of</b>: ' + company + '<hr size=1 color="white"><b>Writes at</b>: <a class="infolink" href=' + blog + '>' + blog + '</a></div></br>';
                
                var repos;
                $.getJSON(repouri, function(json) {
                    repos = json;
                    repodata();
                });

                function repodata() {
                    if (repos.length==0) { output = output + '<p>No repos!</p></div>';}

                    else {
                        output = output + '<div class="repo">Repo List';
                        $.each(repos, function(index,repos) {
                            output = output + '<div class="repobox"><a class="link" href="' + repos.html_url + '">' + repos.name + '</a>';
                            output = output + '<div class="repodesc">' + repos.description + '</div></div>';
                        });
                        output = output + '</div></br></br></div>';
                    }
                    $('#result').html(output);
                    window.scrollTo(0,500);
                }  
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
    


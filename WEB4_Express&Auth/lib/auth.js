module.exports = {
    isOwner:function(request, response){
        if(request.session.is_logined){
            return true
        } else{
            return false
        }   
    },
    statusUI:function(request, response){
        var authStatusUI = '<a href="/auth/login">login</a>'
        if(this.isOwner(request, response)){
            authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`
        }
        return authStatusUI;
    }
}

function authIsOwner(request, response){
    if(request.session.is_logined){
        return true
    } else{
        return false
    }   
}
function authStatusUI(request, response){
    var authStatusUI = '<a href="/auth/login">login</a>'
    if(authIsOwner(request, response)){
        authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`
    }
    return authStatusUI;
}
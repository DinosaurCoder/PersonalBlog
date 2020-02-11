var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        tags: "",
        content: "",
        views: "",
        ctime: ""
    },
    computed: {},
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = new Date(parseInt( result.ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') ;
            blogDetail.views = result.views;
            blogDetail.tags = result.tags;
        }).catch(function (resp) {
            console.log("请求失败")
        })
    }
});

var sendComment = new Vue({
    el: "#sendComments",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                }).catch(function (resp) {
                    console.log("错误");
                })
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code.toLowerCase() != this.rightCode.toLowerCase()) {
                    alert("验证码有误，请重新输入");
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1]);
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;

                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&comment=" + content + "&parentName=" + replyName,
                }).then(function (resp) {
                    alert("评论成功");
                    content = "";
                    email = "";
                    window.location.reload()
                })
            }
        }
    },
    created: function () {
        this.changeCode();
    }

});


var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: [

        ]
    },
    computed: {
        reply: function () {
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#sendComments"
            }
        }
    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e)
                }
            }
        };
        axios({
            method: "get",
            url: "/queryCommentByBlogId?bid=" + bid
        }).then(
            function (resp) {
                for(var i=0;i<resp.data.data.length;i++){
                    resp.data.data[i].ctime = new Date(parseInt( resp.data.data[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') ;
                }
                blogComments.comments = resp.data.data;
                for(var i=0;i<blogComments.comments.length;i++){
                    if(blogComments.comments[i].parent > -1){
                        blogComments.comments[i].options = "回复@"+blogComments.comments[i].parent_name;
                    }
                }
            }
        );
        axios({
            method:"get",
           url:"/queryCommentTotal?bid="+bid
        }).then(function(resp){
            console.log(resp);
            blogComments.total = resp.data.data[0].count
        });
    }
});
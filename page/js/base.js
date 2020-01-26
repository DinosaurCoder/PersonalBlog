var right_tags = new Vue({
    el: "#right_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },
        randomSize: function () {
            return function () {
                return (Math.random() * 20 + 5) + "px";
            }
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryAllTags"
        }).then(function(resp){
            var result = [];
            for(var i=0; i < resp.data.data.length;i++){
                result.push(resp.data.data[i].tag);
            };
            right_tags.tags = result
        })
    }
});

var new_hot = new Vue({

    el: "#new_hot",
    data: {
        titleList: [
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            }
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(resp){
            var result = [];
            for(var i=0; i < resp.data.data.length;i++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid="+resp.data.data[i].id;
                result.push(temp);
            };
            new_hot.titleList = result
        });
    }
});

var new_comment = new Vue({
    el: "#new_comment",
    data: {
        commentList: [
            {
            name:"xiao",
            date:"222",
            comment:"ahahha"
            }
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryNewComment"
        }).then(function (resp){
            console.log(new Date(parseInt(resp.data.data[1].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') );
            var result = [];
            for(var i=0; i < resp.data.data.length;i++){
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date =new Date(parseInt( resp.data.data[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') ;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            };
            new_comment.commentList = result
        })
    }
});
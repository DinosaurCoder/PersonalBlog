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
            console.log(resp);
            var result = [];
            for(var i=0; i < resp.data.data.length;i++){
                result.push(resp.data.data[i].tag);
            };
            console.log(result)
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
            },
            {
                title: "这是第一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是第二个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是第三个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
            {
                title: "这是一个标题",
                link: "https://www.baidu.com"
            },
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(resp){console.log(resp)});
    }
});

var new_comment = new Vue({
    el: "#new_comment",
    data: {
        commentList: [
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
            {
                name: "这里是用户名",
                date: "2020年1.16",
                comment: "这里是评论"
            },
        ]
    }
});
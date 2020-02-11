
var everyday = new Vue({
    el: "#everyday",
    data: {
        content: ""
    },
    computed: {
        getContent: function () {
            return this.content;
        },
        translation: function () {
            return this.tran;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay",
        }).then(function (resp) {
            everyday.content = resp.data.data[0].content
            console.log(resp.data.data[0].content)
        }).catch(function (resp) {
            console.log(请求失败);
        });
    }
});

var article_list = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
    },
    computed: {
        jumpTo:function(){
            return function(page){
                this.getPage(page,this.pageSize);
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                axios({
                    method: "get",
                    url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,

                }).then(function (resp) {
                    var result = resp.data.data;
                    var list = [];
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = new Date(parseInt( result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') ;
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = "/blog_detail.html?bid=" + result[i].id;
                        list.push(temp);
                    }
                    article_list.articleList = list;
                    article_list.page = page;
                }).catch(function (resp) {
                    console.log("请求错误")
                });
                axios({
                    method:"get",
                    url:"/queryBlogCount"
                }).then(function(resp){
                    article_list.count = resp.data.data[0].count;
                    
                });
                this.generatePageTool;
        }},
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({
                text: "<<",
                page: 1
            });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                })
            };
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                })
            };
            result.push({
                text: nowPage,
                page: nowPage
            });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                })
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                })
            }
            result.push({
                text: ">>",
                page: parseInt((totalCount + pageSize - 1) / pageSize)
            });
            this.pageNumList = result;
            return result
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
});



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
        }).catch(function (resp) {
            console.log(请求失败);
        });
    }
});

var article_list = new Vue({
    el: "#article_list",
    data: {
        pager: 1,
        pageSize: 7,
        count: '',
        pageNumList: [],
        articleList: []
    },
    computed: {
        getPage: function () {
            return function (pager, pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (tag == "") {//不在查询时
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (pager - 1) + "&pageSize=" + pageSize,
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = new Date(parseInt(result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article_list.articleList = list;
                    }).catch(function (resp) {
                        console.log("请求错误")
                    });
                }
                else {
                    axios({
                        method: "get",
                        url: "queryByTag?tag=" + tag + "&page=" + (pager - 1) + "&pageSize=" + pageSize
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = new Date(parseInt(result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article_list.articleList = list;
                    })
                    axios({
                        method: "get",
                        url: "queryByTagCount?tag=" + tag
                    }).then(function (resp) {
                            page.total = resp.data.data[0].count;
                        }
                    )
                }
            }
        },

    },
    created: function () {
        this.getPage(this.pager, this.pageSize);
    }
});
var page = new Vue({
    el: "#block",
    data: {
        current: 1,
        total: "",
        panelNumber: 5,
        pageSize: 7
    },
    template: `
    <div id="pager" class="pager">
    <a @click="changeCurrent(1)" class="pager-item" :class="{disabled:current==1}">首页</a>
    <a @click="changeCurrent(current-1)" class="pager-item" :class="{disabled:current==1}">上一页</a>
    <a @click="changeCurrent(item)" class="pager-item" :class="{active:item==current}" v-for="item in numbers" :key="item">
        {{item}}
    </a>
    <a @click="changeCurrent(current+1)" class="pager-item" :class="{disabled:totalComputed==current}">下一页</a>
    <a @click="changeCurrent(totalComputed)" class="pager-item" :class="{disabled:totalComputed==current}">尾页</a>
    <span class="pager-text">
      <i>{{this.current}}</i>/
      <i>{{this.total}}</i>
    </span>
  </div>
    `,
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var tag = "";
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "tag") {
                try {
                    tag = searchUrlParams[i].split("=")[1];
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogCount"
        }).then(function (resp) {
            page.total = resp.data.data[0].count;
        });


    },
    methods: {
        changeCurrent(current) {
            console.log("我被调用了，进行跳转");
            if (current < 1)
                current = 1;
            else if (current > this.totalComputed)
                current = this.totalComputed;
            this.current = current;
            // 当点击下一页触发该函数时，由于current属性是vue主组件传过来的，page
            // 组件不得对其进行修改，所以要将时间抛回给vue主组件。使用this.$emit("事件名"，时间参数进行传递)；
            article_list.getPage(current, 7);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    },
    computed: {
        numbers() {
            //返回数字的数组
            var min = this.current - Math.floor(this.panelNumber / 2);
            if (min < 1) min = 1;
            var max = min + this.panelNumber - 1;
            if (max > this.totalComputed) max = this.totalComputed;
            const arr = [];
            for (let i = min; i <= max; i++) {
                arr.push(i);
            }
            return arr;
        },
        totalComputed() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
})
var search = new Vue({
    el: "#search",
    data: {
        search: ""
    },
    methods: {
        sendSearch: function () {
            axios({
                url: "/blogsearch?search=" + this.search
            }).then(function (resp) {
                console.log(resp);
                var result = resp.data.list;
                var list = [];
                for (var i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = new Date(parseInt(result[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    temp.id = result[i].id;
                    temp.link = "/blog_detail.html?bid=" + result[i].id;
                    list.push(temp);
                }
                article_list.articleList = list;
                page.total = "";
                var d1=document.getElementById("pager");
                d1.innerHTML="";
            });
        }
    }
});

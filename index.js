var express = require("express");

var globalConfig = require("./config");

var loder = require("./loder");

var app = express();

app.use(express.static("./page/"));

app.post("/editEveryDay", loder.get("/editEveryDay"));
app.post("/editBlog", loder.get("/editBlog"));
app.get("/queryBlogCount", loder.get("/queryBlogCount"));
app.get("/queryEveryDay", loder.get("/queryEveryDay"));
app.get("/queryBlogByPage", loder.get("/queryBlogByPage"));
app.get("/queryBlogById", loder.get("/queryBlogById"));
app.get("/addComment", loder.get("/addComment"));
app.get("/queryRandomCode", loder.get("/queryRandomCode"));
app.get("/queryCommentByBlogId", loder.get("/queryCommentByBlogId"));
app.get("/queryCommentTotal", loder.get("/queryCommentTotal"));
app.get("/queryAllBlog", loder.get("/queryAllBlog"));
app.get("/queryAllTags", loder.get("/queryAllTags"));
app.get("/queryHotBlog", loder.get("/queryHotBlog"));
app.get("/queryNewComment", loder.get("/queryNewComment"));
app.get("/queryByTag", loder.get("/queryByTag"));
app.get("/queryByTagCount", loder.get("/queryByTagCount"));
app.get("/blogsearch", loder.get("/blogsearch"));
app.listen(globalConfig.port, function () {
    console.log("服务已连接");
})
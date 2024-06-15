var posts=["2024/06/15/hello-world/","2024/06/15/前端/demo/","2024/06/15/项目/个人课表/ctable/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };
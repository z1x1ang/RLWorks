function showContent(experiment){
fetch(`${experiment}.html`)
.then(response => response.text())  // 解析响应为JSON(也可为blob等)
.then(data => {
document.getElementById('article-content').innerHTML=data;
})    // 处理数据
.catch(error => console.error('错误:', error));  // 处理错误
}
showContent('experiment_1')
function showContent(experiment){
fetch(`${experiment}.html`)
.then(response => response.text())  // 解析响应为JSON(也可为blob等)
.then(data => {
document.getElementById('article-content').innerHTML=data;
// 加载内容后，调用 MathJax 来处理页面上的新 LaTeX 代码
MathJax.typeset();
})    // 处理数据
.catch(error => console.error('错误:', error));  // 处理错误
}
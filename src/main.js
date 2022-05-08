// 定义初始值
const initial =[
    {
        logo:'G',
        url:'https://www.google.com/'
    },
    {
        logo:'V',
        url:'https://cn.vuejs.org/index.html'
    },
    {
        logo:'J',
        url:'https://juejin.cn/'
    },
    {
        logo:'E',
        url:'https://element.eleme.io/'
    },
    {
        logo:'W',
        url:'https://www.w3school.com.cn/'
    },
]
// 读本地存储
const hashMapStr = localStorage.getItem('hashMapStr') 
const hashMapObj = JSON.parse(hashMapStr)
// 用初始值或本地存储
const hashMap = hashMapObj || initial 
console.log(hashMap);
// 写一个整理url的方法
const urlRule = (url)=>{
    // 判断如果url没有http开头
    if(url.indexOf('http') !== 0 ){
        console.log('输入地址有误，重新输入！');
    }else{
       return url.replace('https://', '')
                .replace('http://', '')
                .replace('www.', '')
                .replace(/\/.*/, '')
    }
}
// 写一个更新站点的方法
const updateNode = ()=>{
// 删掉除添加 的所有li
$(".siteList>li:not(.last)").remove()
// 从hashMap里重新添加节点,用到了insertBefore方法，
hashMap.forEach((item,index)=>{
    console.log(item);
    const $li=$(`
    <li class="content">
        <div class="site">
            <div class="logo">${item.logo}</div>
            <div>${urlRule(item.url)}</div>
            <div class="close">
                 <svg class="icon">
                 <use xlink:href="#i-close"></use>
                </svg>
            </div>
        </div>
  </li>
  `
  ).insertBefore('.last')
//   用open方法代替a标签实现网页跳转
  $li.on('click', () => {
    open(item.url)
  })
  $li.on('click', '.close', (e) => {
    e.stopPropagation() // 阻止冒泡
    hashMap.splice(index, 1)
    updateNode()
  })
})
}

// 新增
$('.last').on('click',()=>{
    let content = prompt('请输入新增网址：')
    if(content.indexOf('http') !== 0){
        content = 'https://' + content
    }
    hashMap.push(
        {
        logo:urlRule(content).charAt(0),
        url:content
    }
    )
    updateNode()
})

updateNode()

// 将Map里的数据存到本地存储
window.onbeforeunload = () => {     //监听离开页面的事件
    const hashMapStr = JSON.stringify(hashMap); 
    localStorage.setItem("hashMapStr", hashMapStr); 
}
$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
  })
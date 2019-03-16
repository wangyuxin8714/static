var ul = document.getElementsByTagName("ul")[0];
datas.forEach(function(item,index){
    console.log(item.city);
    var li  = document.createElement("li");//li标签
    var span1 = document.createElement("span");//城市名称
    span1.innerHTML = item.city;
    li.appendChild(span1);
    //占比
    var span2 = document.createElement("span");//
    var span3 = document.createElement("span");
    span2.className = "total";
    span3.className = "percent";
    span3.style.width = getRadio(item)+"px"; //  span3.width/span2.width = item.num/8000
    span3.style.background = item.color;
    span2.appendChild(span3);
    li.appendChild(span2);
    //显示具体的值
    var span4 = document.createElement("span");
    span4.innerHTML = item.num;
    li.appendChild(span4);
    ul.appendChild(li);
})

function getRadio(item){
    return item.num/8000*200;
}

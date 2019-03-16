# canvas
## 什么是canvas？
    
    是一个可以使用脚本(通常为JavaScript)来绘制图形的 HTML 元素.
    
==canvas标签用来绘制图像，本身就是一个画布，没有绘画能力，所有的绘制都是通过js脚本实现的==

## 都能干什么？

    可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画


![image](https://mdn.mozillademos.org/files/257/Canvas_tut_examples.jpg)


## 默认大小
    
    Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。不能通过行内样式来修改宽高，它有自己的宽高属性。

## 渲染上下文

    <canvas>元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。
    
    canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。
    
    <canvas> 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能
    
    getContext()只有一个参数，上下文的格式
```
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

## 栅格
    
    在我们开始画图之前，我们需要了解一下画布栅格（canvas grid）以及坐标空间。上一页中的HTML模板中有个宽150px, 高150px的canvas元素。如右图所示，canvas元素默认被网格所覆盖。通常来说网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））
    
![image](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

## API
###     绘制路径
    图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合

#### 使用路径绘制图形需要的步骤
1. 首先，你需要创建路径起始点
2. 然后你使用画图命令去画出路径
3. 之后你把路径封闭
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形

##### 以下是所要用到的函数
    
>beginPath()

    新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
>closePath()

    闭合路径之后图形绘制命令又重新指向到上下文中
>stroke()

    通过线条来绘制图形轮廓
    
>fill()

    通过填充路径的内容区域生成实心的图形

##### 生成路径的步骤
- beginPath()

> 注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。

- 调用函数指定绘制路径
- 就是闭合路径closePath(),不是必需的。

> 注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。



### 绘制线条
    
#### 步骤
- 开启路径 

>beginPath()
- 设置起始点    
> moveTo(x,y);
- 设置'结束点'
> lineTo(x,y);
- 描边/填充
> stroke()/fill()

- 关闭路径
> closePath()

### 绘制矩形的方法
>rect(x,y,width,height) 
    
    需要配合 stroke() 或 fill() 方法在画布上实际地绘制矩形
    
>fillRect(x, y, width, height)
    
    绘制一个填充的矩形
>strokeRect(x, y, width, height)

    绘制一个矩形的边框
>clearRect(x, y, width, height)
    
    清除指定矩形区域，让清除部分完全透明

### 圆弧
    
>arc(x,y,r,sAngle,eAngle,counterclockwise);

    x,y 是圆心点的坐标
    r是圆的半径
    sAngle、eAngle是圆的起始角度和结束角度。以弧度计
    counterclockwise可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针

### 样式
    
>strokeStyle
    
    描边的颜色
>fillStyle 
    
    填充的颜
    
### 阴影
>shadowColor 

    阴影的颜色
>shadowBlur 
    
    阴影的模糊级别
>shadowOffsetX 
    
    阴影的水平距离
>shadowOffsetY
    
    阴影的垂直距离

### 线条的样式
>lineCap
    
    设置或返回线条的结束端点样式
- butt 默认。向线条的每个末端添加平直的边缘
- round 向线条的每个末端添加圆形线帽。
- square 向线条的每个末端添加正方形线帽

>lineWidth 

    当前线条的宽度，以像素计。
### 旋转
>rotate(angle);

    旋转角度，以弧度计。
==角度转弧度公式==
    
    deg*Math.PI/180

    如需旋转 5 度，可规定下面的公式：5*Math.PI/180。
### 重新映射画布（0,0）
    
    translate(x,y);
### 绘制文本方法
> fillText(text,x,y,maxWidth)
    
    在画布上绘制“被填充的”文本
    text	规定在画布上输出的文本。
    x：开始绘制文本的x坐标位置（相对于画布）
    y:开始绘制文本的Y坐标位置（相对于画布。
    maxWidth	可选。允许的最大文本宽度，以像素计。
> strokeText()
    
    在画布上绘制文本（无填充）
    同上
### 绘制文本的属性
>textAlign 
    
    start	默认。文本在指定的位置开始。
    end	文本在指定的位置结束。
    center	文本的中心被放置在指定的位置。
    left	文本左对齐。
    right	文本右对齐。
>textBaseline 
    
    alphabetic默认。文本基线是普通的字母基线
    top	文本基线是 em 方框的顶端。。
    hanging	文本基线是悬挂基线。
    middle	文本基线是 em 方框的正中。
    ideographic	文本基线是表意基线。
    bottom	文本基线是 em 方框的底端。
>font 
    属性设置或返回画布上文本内容的当前字体属性

值 | 说明
---|---
font-style | 规定字体样式。可能的值：normal、italic、oblique
font-variant | 规定字体变体。可能的值：normal、small-caps
font-weight | 规定字体的粗细。可能的值normal、bold、600等
font-size / line-heigh | 规定字号和行高，以像素计
font-family | 规定字体系列



### 渐变
    
>createLinearGradient(x0,y0,x1,y1); 线性渐变

    x0渐变开始点的x坐标
    y0	渐变开始点的y坐标
    x1	渐变结束点的 x 坐标
    y1	渐变结束点的 y 坐标

>createRadialGradient(x0,y0,r0,x1,y1,r1);放射性渐变

    x0	渐变的开始圆的 x 坐标
    y0	渐变的开始圆的 y 坐标
    r0	开始圆的半径
    x1	渐变的结束圆的 x 坐标
    y1	渐变的结束圆的 y 坐标
    r1	结束圆的半径


>addColorStop(stop,color);

    stop	介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
    color	在结束位置显示的 CSS 颜色值



```
var grd=ctx.createLinearGradient(0,0,170,0);
grd.addColorStop(0,"black");
grd.addColorStop("0.3","magenta");
grd.addColorStop("0.5","blue");
grd.addColorStop("0.6","green");
grd.addColorStop("0.8","yellow");
grd.addColorStop(1,"red");

ctx.fillStyle=grd;
ctx.fillRect(20,20,150,100);
```

### save() 
    保存当前环境的状态
### restore()
    返回之前保存过的路径状态和属性
### 绘制图像
    
>drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

    

参数 | 描述
---|---
img | 规定要使用的图像、画布或视频
sx | 可选。开始剪切的 x 坐标位置
sy | 可选。开始剪切的 y 坐标位置
swidth | 可选。被剪切图像的宽度
sheight | 可选。被剪切图像的高度
x | 在画布上放置图像的 x 坐标位置
y | 在画布上放置图像的 y 坐标位置
width | 可选。要使用的图像的宽度。（伸展或缩小图像）
height | 可选。要使用的图像的高度。（伸展或缩小图像）


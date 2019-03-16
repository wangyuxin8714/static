## 柱状图
    
    需要的知识点：
    moveTo();
    lineTo();
    strokeStyle 
    stroke();
    fillRect();
    fillText();

**思路**

- 先移动画布(0,0)到交叉点的位置
    
    
    translate(x,y)    


- 绘制水平方向的线条
- 循环里面绘制垂直线条
- 循环里面绘制水平刻度和垂直刻度
    
    
    moveTo(x,y) lineTo(x,y) stoke()

    
- 绘制水平方向的文字和垂直方向的文字
    
    
    fillText(text,x,y);    


- 先绘制第一排的第一个矩形，找到规律后再放到循环里面绘制第一排的矩形。
    
    
    fillRect(x,y,w,h);    
    
    end = start + a.v * bill // 结束位置等于自己的起始位置加上自身的宽度
    start = end; //起始位置等于上一个矩形的结束位置
- 然后再绘制每一排的循环

## 画板绘制
    
    需要用到的知识点
    
    moveTo();
    lineTo();
    strokeStyle 
    stroke();
    globalCompositeOperation
    toDataURL()
**思路**
- input框里面的type=color,调取取色板
- input框里面的type=range，调取拖拽进度条
- 鼠标按下的时候取一下鼠标的坐标点。
- 鼠标移动的时候取一下鼠标移动的坐标点
- 鼠标抬起的时候清空事件
- ctx.globalCompositeOperation 使用这个方法来试下橡皮擦功能 //'destination-out'在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 source-over默认。在目标图像上显示源图像
- toDataURL() // 方法返回一个包含图片展示的 data URI，这个结果是一个base64格式的图片

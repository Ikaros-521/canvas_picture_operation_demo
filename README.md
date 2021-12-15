# 前言
参考文章：
[https://www.cnblogs.com/HPhone/p/3459957.html](https://www.cnblogs.com/HPhone/p/3459957.html)  
[https://blog.csdn.net/weixin_29065959/article/details/112268524](https://blog.csdn.net/weixin_29065959/article/details/112268524)  
[https://blog.csdn.net/poqe131/article/details/51012454](https://blog.csdn.net/poqe131/article/details/51012454)  
结合实际案例 色度图 进行功能拓展和运用。  
## 功能说明
加载img下的色度图片，显示在canvas中，可以进行图片的拖拽，移动，缩放。  
可以根据下放的输入框进行四边形顶点的确定，程序会自动进行连线。  
鼠标点击图片会获取点击位置的颜色显示在右侧，并在下发显示坐标位置，和判断此点是否在四边形范围内。  
## 工程下载
[码云](https://gitee.com/ikaros-521/canvas_picture_operation_demo) [GitHub](https://github.com/Ikaros-521/canvas_picture_operation_demo)
# 效果图
![在这里插入图片描述](https://img-blog.csdnimg.cn/9244e55921e14c7e97035744181f01a1.gif#pic_center)

# 报错
控制台报错：`Uncaught DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.`  
无法获取鼠标点击位置颜色。网上说是图片跨域问题，设置img.crossOrigin='Anonymous'；可以解决，实测又有新的问题。所以还是将工程部署在web server上，比较方便。我这采用 PHP Study简单部了下。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/5ad9b8ea85674d57b108cff81433a03c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBATG92ZeS4tuS8iuWNoea0m-aWrw==,size_14,color_FFFFFF,t_70,g_se,x_16)


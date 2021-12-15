/*
	参考文章：
	https://www.cnblogs.com/HPhone/p/3459957.html
	https://blog.csdn.net/weixin_29065959/article/details/112268524
	https://blog.csdn.net/poqe131/article/details/51012454
*/
var canvas, context;
var img, //图片对象
    imgIsLoaded, //图片是否加载完成;
    imgX = 0,
    imgY = 0,
    imgScale = 1;

var image_widht = 0;
var image_height = 0;

// 边界ABC的xy值
var arr_xy = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];

(function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    load_img();
})();

// 加载图片
function load_img() {
    img = new Image();
    img.src = "img/1.jpeg";
    // img.crossOrigin = 'Anonymous';
    img.onload = function() {
        imgIsLoaded = true;
        drawImage();
        image_width = img.width;
        image_height = img.height;
    }
}

// 绘制图片
function drawImage() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width * imgScale, img.height * imgScale);
    set_boundary();
}

// 监听canvas拖动事件
canvas.ontouchstart = function(event) {
	var touch = event.touches[0];
    var pos = window_to_canvas(canvas, touch.clientX, touch.clientY);
    canvas.ontouchmove = function(event) {
	    var touch = event.touches[0];
        canvas.style.cursor = "move";
        var pos1 = window_to_canvas(canvas, touch.clientX, touch.clientY);
        var x = pos1.x - pos.x;
        var y = pos1.y - pos.y;
        pos = pos1;
        imgX += x;
        imgY += y;
        drawImage();
    }

    canvas.ontouchend = function() {
        canvas.ontouchmove = null;
        canvas.ontouchend = null;
        canvas.style.cursor = "default";
    }
    //->console.log("canvas开始坐标 x="+imgX +" & y="+imgY);
}

// 监听canvas放大缩小事件
canvas.onmousewheel = canvas.onwheel = function(event) {
    var pos = window_to_canvas(canvas, event.clientX, event.clientY);
    event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));
    if (event.wheelDelta > 0) {
        imgScale *= 2;
        imgX = imgX * 2 - pos.x;
        imgY = imgY * 2 - pos.y;
    } else {
        imgScale /= 2;
        imgX = imgX * 0.5 + pos.x * 0.5;
        imgY = imgY * 0.5 + pos.y * 0.5;
    }
    drawImage();
    //->console.log("canvas开始坐标 x="+imgX +" & y="+imgY);
}

// 监听canvas拖动事件
canvas.onmousedown = function(event) {
    var pos = window_to_canvas(canvas, event.clientX, event.clientY);
    canvas.onmousemove = function(event) {
        canvas.style.cursor = "move";
        var pos1 = window_to_canvas(canvas, event.clientX, event.clientY);
        var x = pos1.x - pos.x;
        var y = pos1.y - pos.y;
        pos = pos1;
        imgX += x;
        imgY += y;
        drawImage();
    }

    canvas.onmouseup = function() {
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.style.cursor = "default";
    }
    //->console.log("canvas开始坐标 x="+imgX +" & y="+imgY);
}

// 监听canvas放大缩小事件
canvas.onmousewheel = canvas.onwheel = function(event) {
    var pos = window_to_canvas(canvas, event.clientX, event.clientY);
    event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));
    if (event.wheelDelta > 0) {
        imgScale *= 2;
        imgX = imgX * 2 - pos.x;
        imgY = imgY * 2 - pos.y;
    } else {
        imgScale /= 2;
        imgX = imgX * 0.5 + pos.x * 0.5;
        imgY = imgY * 0.5 + pos.y * 0.5;
    }
    drawImage();
    //->console.log("canvas开始坐标 x="+imgX +" & y="+imgY);
}

// 监听canvas点击事件
canvas.onclick = function(event) {
    // 重新绘制
    drawImage();
    var pos = window_to_canvas(canvas, event.clientX, event.clientY);
    //实际点的坐标
    var isX = 0;
    var isY = 0;
    //实际选中坐标 肯定 = 点击的坐标 + canvas的坐标(必须为-数)
    var temp_canvas_x = imgX - imgX * 2;
    var temp_canvas_y = imgY - imgY * 2;

    //console.log("imgX = "+imgX + " & imgY = "+imgY);
    //console.log("temp_canvas_x = "+temp_canvas_x + " & temp_canvas_y = "+temp_canvas_y);

    if (imgScale == 1) { //原始尺寸
        isX = (pos.x + temp_canvas_x);
        isY = (pos.y + temp_canvas_y);
    } else {
        if (imgScale > 1) { //被放大了,实际坐标需要/
            isX = (pos.x + temp_canvas_x) / imgScale;
            isY = (pos.y + temp_canvas_y) / imgScale;
        } else { //被缩小了,坐标点放大
            isX = (pos.x + temp_canvas_x) * (1 / imgScale);
            isY = (pos.y + temp_canvas_y) * (1 / imgScale);
        }
    }

    //处理左上的是否超出图片范围
    if (isX < 0 || isY < 0) {
        console.log("请选择图片区域");
        //return;
    }
    //处理右下区域,主要处理图片是否超出
    if (isX > image_width || isY > image_height) {
        console.log("超出图片尺度");
    }
    console.log("点击的坐标点: x = "+isX + " & y = "+isY);
    console.log("图片完整的宽度 = "+image_width + " & 高度 = "+image_height);
    console.log("缩放级别: "+imgScale);

    var ctx = document.getElementById("canvas").getContext("2d");

    // 开始新路径
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    // 画空心圆 arc(x,y,r,sAngle,eAngle,counterclockwise)
    ctx.arc(pos.x, pos.y, 3, 0, 360, false);
    ctx.stroke();
    ctx.closePath();

    // 校验边界
    check_boundary(isX, isY);

    document.getElementById("x_input").value = pixel_point_to_map_point("x", isX, true);
    document.getElementById("y_input").value = pixel_point_to_map_point("y", isY, true);
    
    // 获取img颜色
    var imgData = ctx.getImageData(pos.x, pos.y, 1, 1);
    red = imgData.data[0];
    green = imgData.data[1];
    blue = imgData.data[2];
    alpha = imgData.data[3];

    console.log("red=" +red+ " green=" +green+ " blue=" +blue+ " alpha=" +alpha);
    document.getElementById("canvas2").style.background = 'rgba('+red+','+green+','+blue+','+alpha+')';
}

//获取窗口中canvas的区域
function window_to_canvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x- bbox.left-(bbox.width- canvas.width) / 2,
        y: y- bbox.top-(bbox.height- canvas.height) / 2 
    };
}

// 设置边界范围
function set_boundary() {
    var inputs = document.getElementById("boundary_div").getElementsByTagName('input');
    for(var i = 0; i < arr_xy.length; i++)
    {
        arr_xy[i].x = pixel_point_to_map_point("x", inputs[2*i].value, false);
        arr_xy[i].y = pixel_point_to_map_point("y", inputs[2*i+1].value, false);
    }

    var ctx = document.getElementById('canvas').getContext('2d');
    //设置颜色
    ctx.fillStyle = "white";

    // 获取相对坐标
    function get_opp_xy(type, val) {
        var temp_canvas_x = imgX - imgX * 2;
        var temp_canvas_y = imgY - imgY * 2;

        if(type == "x")
        {
            return (val * imgScale - temp_canvas_x);
        }
        return (val * imgScale - temp_canvas_y);
    }

    // 获取偏移值
    function get_offset_val(type, index, val) {
        if(type == "x")
        {
            if(index == 0 || index == 2)
                return -val;
            else
                return val;
        }
        else
        {
            if(index == 0 || index == 1)
                return -val;
            else
                return val;
        }
    }

    function offset_val(val) {
        if(imgScale > 1)
            return val;
        return imgScale * val;
    }

    for(var i = 0; i < arr_xy.length; i++)
    {
        // 绘制点 移动4
        ctx.fillRect(get_opp_xy("x", arr_xy[i].x) + get_offset_val("x", i, offset_val(4)), 
            get_opp_xy("y", arr_xy[i].y) + get_offset_val("y", i, offset_val(4)), offset_val(4), offset_val(4));
    }

    // 根据点连线
    // 防止重绘
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    for(var i = 0; i < arr_xy.length; i++)
    {
        for(var j = i + 1; j < arr_xy.length; j++)
        {
            // 绘制相邻2点
            if(2 == Math.abs(i - j)) continue;
            ctx.moveTo(get_opp_xy("x", arr_xy[i].x) + get_offset_val("x", i, offset_val(4)) + offset_val(2), 
                get_opp_xy("y", arr_xy[i].y) + get_offset_val("y", i, offset_val(4)) + offset_val(2));
            ctx.lineTo(get_opp_xy("x", arr_xy[j].x) + get_offset_val("x", j, offset_val(4)) + offset_val(2), 
                get_opp_xy("y", arr_xy[j].y) + get_offset_val("y", j, offset_val(4)) + offset_val(2));
        }  
    }
    ctx.stroke();
}

// 检查边界值
function check_boundary(pt_x, pt_y) {
    var pt = {x: pt_x, y:pt_y};
    var pts = [{x: arr_xy[0].x, y: arr_xy[0].y}, {x: arr_xy[1].x, y: arr_xy[1].y}, 
        {x: arr_xy[2].x, y: arr_xy[2].y}, {x: arr_xy[3].x, y: arr_xy[3].y}];

    //console.log("pt.x:"+pt.x+" pt.y:"+pt.y);

    if(checkPP(pt, pts))
    {
        document.getElementById("is_inside_ret").innerText = "是";
        console.log("在指定范围内");
        return true;
    }

    document.getElementById("is_inside_ret").innerText = "否";
    console.log("不在指定范围内");
    return false;
}

// 判断点是否在多边形内 
function checkPP(point, polygon) {
    //计算向量叉乘
    var crossMul = function(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    };

    // 判断两条线段是否相交 
    var checkCross = function(p1, p2, p3, p4) {
        var v1 = {
                x: p1.x - p3.x,
                y: p1.y - p3.y
            },
            v2 = {
                x: p2.x - p3.x,
                y: p2.y - p3.y
            },
            v3 = {
                x: p4.x - p3.x,
                y: p4.y - p3.y
            },
            v = crossMul(v1, v3) * crossMul(v2, v3);
        v1 = {
            x: p3.x - p1.x,
            y: p3.y - p1.y
        };
        v2 = {
            x: p4.x - p1.x,
            y: p4.y - p1.y
        };
        v3 = {
            x: p2.x - p1.x,
            y: p2.y - p1.y
        };
        return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;
    };

    var p1, p2, p3, p4;
    p1 = point;
    p2 = {
        x: -100,
        y: point.y
    };
    var count = 0;
    //对每条边都和射线作对比 
    for (var i = 0; i < polygon.length - 1; i++) {
        p3 = polygon[i];
        p4 = polygon[i + 1];
        if (checkCross(p1, p2, p3, p4) == true) {
            count++;
        }
    }
    p3 = polygon[polygon.length - 1];
    p4 = polygon[0];
    if (checkCross(p1, p2, p3, p4) == true) {
        count++;
    }

    return (count % 2 == 0) ? false : true;
}

// 选中鼠标坐标的颜色
function choose_xy_color() {
    console.log("choose_xy_color()......");

    var x_input = parseFloat(document.getElementById("x_input").value);
    var y_input = parseFloat(document.getElementById("y_input").value);

    var x = pixel_point_to_map_point("x", x_input, false);
    var y = pixel_point_to_map_point("y", y_input, false);

    // 重新绘制
    drawImage();

    // 校验边界
    check_boundary(x, y);

    var pos_x, pos_y;

    var temp_canvas_x = imgX - imgX * 2;
    var temp_canvas_y = imgY - imgY * 2;

    //console.log("imgX = "+imgX + " & imgY = "+imgY);
    //console.log("temp_canvas_x = "+temp_canvas_x + " & temp_canvas_y = "+temp_canvas_y);

    if (imgScale == 1) { //原始尺寸
        pos_x = x - temp_canvas_x;
        pos_y = y - temp_canvas_y;
    } else {
        if (imgScale > 1) { //被放大了,实际坐标需要/
            pos_x = x * imgScale - temp_canvas_x;
            pos_y = y * imgScale - temp_canvas_y;
        } else { //被缩小了,坐标点放大
            pos_x = x / (1 / imgScale) - temp_canvas_x;
            pos_y = y / (1 / imgScale) - temp_canvas_y;
        }
    }

    var ctx = document.getElementById("canvas").getContext("2d");

    // 开始新路径
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    // 画空心圆 arc(x,y,r,sAngle,eAngle,counterclockwise)
    ctx.arc(pos_x, pos_y, 3, 0, 360, false);
    ctx.stroke();
    ctx.closePath();

    var imgData = ctx.getImageData(pos_x, pos_y, 1, 1);
    red = imgData.data[0];
    green = imgData.data[1];
    blue = imgData.data[2];
    alpha = imgData.data[3];

    console.log("red=" +red+ " green=" +green+ " blue=" +blue+ " alpha=" +alpha);
    document.getElementById("canvas2").style.background = 'rgba('+red+','+green+','+blue+','+alpha+')';
}

// 像素点坐标转对应图片上点坐标 (136,961)=>(0,0) (238,961)=>(0.1,0) (136,859)=>(0,0.1)
function pixel_point_to_map_point(type, val, LTR) {
    function getFloat(number, n) {
        n = n ? parseInt(n) : 0;
        if(n <= 0) {
            return Math.round(number);
        }
        number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
        number = Number(number).toFixed(n); //补足位数
        return number;
    };

    if(type == "x")
    {
        if(LTR == true)
            return getFloat((val - 136) / 1020, 4);
        else
            return getFloat(val * 1020 + 136, 4); 
    }
    else if(type == "y")
    {
        if(LTR == true)
            return getFloat((val - 961) / -1020, 4);
        else
            return getFloat(val * -1020 + 961, 4); 
    }
    else
    {
        console.log("pixel_point_to_map_point() type error!");
        return val;
    }
}

// 跳转至官网
function jump_to_official() {
    console.log("");
}
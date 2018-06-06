var UPLOAD_IMAGE = {
	uploadOnlyOneImage:function(btn,input,figure_box) {
    	$("#"+btn).click(function () {
            $("#file").click();
        });
        UPLOAD_IMAGE.add(input,figure_box);
    },
    uploadManyImage:function(btn,input,figure_box) {
    	//产生新的id
        var newId = Utils.randomString(32);
        //绑定点击事件
        $("#"+btn).click(function () {
            $("#files").click();
        });
        //添加上传的图片到显示栏
        UPLOAD_IMAGE.onlyAdd(input,figure_box,newId);
        //选中文件后添加新的input并重新绑定事件
        $("#files").change(function () {
            $(this).attr("id",newId);
            $(this).parent().append("<input hidden=\"hidden\" type=\"file\"  accept=\"image/*\" id=\"files\" name=\"files\" class=\"weui-input\">");
            $("#"+btn).off("click");
            UPLOAD_IMAGE.uploadManyImage(btn,input,figure_box);
        });
    },
    //添加替换原有的
    add: function(btn, figure_box) {
        var figureBox = document.getElementById(figure_box); //获取显示图片的div元素
        var input = document.getElementById(btn); //获取选择图片的input元素

        if (typeof FileReader === 'undefined') {
            $.toast("浏览器版本过低，请先更新您的浏览器！","forbidden");
            input.setAttribute('disabled', 'disabled');
        } else {
            input.addEventListener('change', readFile, false);
            //改变就运行readFile函数。
        }

        function readFile() {
            figureBox.innerHTML = "";
            for (var i=0;i<this.files.length;i++) {
                var file = this.files[i]; //获取file对象
                //判断file的类型是不是图片类型。
                if (!/image\/\w+/.test(file.type)) {
                     $.toast("请上传图片！","forbidden");
                    return false;
                }

                var reader = new FileReader(); //声明一个FileReader实例
                reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
                //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
                reader.onload = function(e) {
                    // 创建一个新增的图片和文字input
                    var figure = $('<img class="weui-media-box__thumb" style="width: 110px;height: 150px;" src="' + this.result + '" />');
                    figure.appendTo(figureBox);
                }
            }
        }
    },
    //添加不替换原有的
    onlyAdd: function(btn, figure_box, newId) {
        var figureBox = document.getElementById(figure_box); //获取显示图片的div元素
        var input = document.getElementById(btn); //获取选择图片的input元素
        //这边是判断本浏览器是否支持这个API。
        if (typeof FileReader === 'undefined') {
            $.toast("浏览器版本过低，请先更新您的浏览器！", function () {
                console.log('close');
            });
            input.setAttribute('disabled', 'disabled');
        } else {
            input.addEventListener('change', readFile, false);
            //如果支持就监听改变事件，一旦改变了就运行readFile函数。
        }

        function readFile() {
            var file = this.files[0]; //获取file对象
            //判断file的类型是不是图片类型。
            if (!/image\/\w+/.test(file.type)) {
                $.toast("请上传图片！","forbidden");
                return false;
            }

            var reader = new FileReader(); //声明一个FileReader实例
            reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
            //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
            reader.onload = function(e) {
                // 创建一个新增的图片和文字input
                var html = "<div style=\"float: left\">" +
                    "<a onclick=\"UPLOAD_IMAGE.delInputFile('"+newId+"',this)\" class='image-many-show'>X</a>" +
                    "    <img class=\"weui-media-box__thumb\" style=\"width: 98px;height: 140px;\" src=\"" + this.result + "\">" +
                    "</div>";
                var figure = $(html);
                figure.appendTo(figureBox);
            }
            
        }

    },
    delInputFile:function(newId,target) {
    	//移除已经删除的input[file]
        $("#"+newId).remove();
        //移除展示的图片
        $(target).parent().remove();
    }

};
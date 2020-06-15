U.addLoad(function () {
   
    axios.get("./static/banner.json")
    .then(res => {
        console.log(res);
        show(res.data);
    }).catch(function (res) {
        console.log('error', res);
    })

    function show(data) {
        var vipFocusmap = U.getClass('vip-focusmap')[0]; // 最外层大盒子
        var focusmapHolder = U.getClass(vipFocusmap, 'focusmap-holder')[0]; // 大图片的ul
        var thumbUl = document.querySelector('.focusmap-thumb ul'); // 小图片的ul
        var leftBtn = U.getClass(vipFocusmap, 'focusmap-l-arr')[0]; // 左按钮
        var rightBtn = U.getClass(vipFocusmap, 'focusmap-r-arr')[0]; // 右按钮
        var maxArr = []; // 存大图片
        var minArr = []; // 存小图片
        var timer = null;
        var count = 0;

        // 创建
        for (var i = 0; i < data.length; i++) {
            var d = data[i]; // 数据
            var maxLi = U.create('li');
            maxLi.innerHTML = '<a href=""><img src="' + d.pic + '" alt=""></a>';
            U.append(focusmapHolder, maxLi);
            maxArr.push(maxLi); // 创建好的图片存入一个数组，这样后面不用再获取

            var minLi = U.create('li');
            minLi.innerHTML = '<img src="' + d.pic_min + '" alt=""><i></i>';
            if (i === 0) {
                U.addClass(minLi, 'active');
            }
            U.append(thumbUl, minLi);
            minArr.push(minLi);
        }

        // 自动播
        timer = setInterval(auto, 2000);
        // 滑上停止
        vipFocusmap.onmouseover = function () {
            clearInterval(timer);
        };
        // 滑离开始
        vipFocusmap.onmouseout = function () {
            timer = setInterval(auto, 2000);
        };

        // 上一张
        leftBtn.onclick = function () {
            count--;
            if (count < 0) {
                count = data.length - 1;
            }
            change();
        };

        // 下一张
        rightBtn.onclick = function () {
            auto()
        };

        // 滑上分页小图
        for (var i = 0; i < minArr.length; i++) {
            minArr[i].index = i;
            minArr[i].onmouseover = function () {
                count = this.index;
                change();
            }
        }

        function auto() {
            count++;
            if (count >= data.length) {
                count = 0;
            }

            change();
        }

        function change() {
            // 运动
            for (var i = 0; i < data.length; i++) {
                if (i === count) {
                    // 当前图展示
                    maxArr[i].style.zIndex = 10;
                    U.move(maxArr[i], {
                        opacity: 100
                    });
                    // 小图
                    U.addClass(minArr[i], 'active');
                } else {
                    // 不展示
                    maxArr[i].style.zIndex = 1;
                    U.move(maxArr[i], {
                        opacity: 0
                    });
                    // 小图
                    U.removeClass(minArr[i], 'active');
                }
            }
        }


    }
});
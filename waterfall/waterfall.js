/*
 * @瀑布流组件
 * @auther kunyujie.com
 * @method  WaterFall  
 * @description 默认配置参数   
 * @param {Number} minBoxWidth -最小宽度  
 * @param {Object} containerSelector -父容器
 * @param {String} columClass -分栏div attribute class
 * @param {Object} boxSelector -item dom
 * @param {Object} lastDom -分栏最后一个item   
 * @param {Function} callBack -回调函数 
 * @example  
 *new WaterFall({
		minBoxWidth : (parseInt($(window).width())-16)/2,
		containerSelector : ".container",
		columClass : "column",
		lastDom: "a:last",
		boxSelector : ".item",
		action:function(){
			$.post("test/getList",{pageNum:page++},function(data){					
			 	if(data.isSuccess){
  	 				//console.log("请求成功！");
			 		for(var i=0,len=data.list.length; i<len; i++){
			 			var tpl = waterfallTpl(data.list[i]);
			 			wf.addBox(tpl);
			 		}
			 		wf.isLoading = true;
			 	}else{
			 		//console.log("没有了");
			 		$(".tips").show();
			 		wf.isLoading = false;
			 	}
			},"json");		 
			wf.isLoading = false;
		}
	});
*
*/  
! function WaterFall(){
	function WaterFall(cfg){
		this.config = {
			minBoxWidth : 200,
			containerSelector : ".container",
			columClass : "column",
			boxSelector : ".item",
			action: null
		};
		this.config = $.extend(this.config,cfg);
		this.isLoading = true;
		this.columns = [];
		this.container = $(this.config.containerSelector);
		this.boxes = this.container ? Array.prototype.slice.call($(this.config.boxSelector)) : [];
		this.init();
		return this;
	}
	
	/**
	 *init 
	 */
	WaterFall.prototype.init = function(){
		var self = this;
		//预先分栏
		self.compose();
		$(window).off().on("resize",function(){
			self.compose();
		})
		$(window).off().on("scroll",function(){
			self.scrollEvent()
		});
	}
    /**
     * ajax数据调用
     */
   WaterFall.prototype.scrollEvent = function() {
   		var self = this;
        var i = self.maxheightIndex();
        if(i > -1) {
            //获取分栏的最后一个div
			var lastBox = $("."+self.config.columClass).find(self.config.boxSelector+":last");
            if(self.isSlide(lastBox) && self.isLoading){
	           callback(); 
            }
        }
        	//外部回调
        function callback() {
            if (self.config.action && typeof self.config.action === 'function') {
                self.config.action();
            }
        }
   };	
	/**
	 *设置每个分栏的最小高度 
	 */
    WaterFall.prototype.minHeightIndex = function() {
    		var self = this;
        if(self.columns && self.columns.length > 0) {
            var min = $(self.columns[0]).height(), index = 0;
            for (var i = 1; i < self.columns.length; i++) {
                var columnElem = self.columns[i];
                if($(columnElem).height() < min) {
                    min = $(columnElem).height();
                    index = i;
                }
            }
            return index;
        }
        else return -1;
    };
    /**
     *设置每个分栏的最大高度 
     */
    WaterFall.prototype.maxheightIndex = function() {
    		var self = this;
        if(self.columns && self.columns.length > 0) {
            var max = $(self.columns[0]).height(), index = 0;
            for (var i = 1; i < self.columns.length; i++) {
                var columnElem = self.columns[i];
                if($(columnElem).height() > max) {
                    max = $(columnElem).height();
                    index = i;
                }
            }
            return index;
        }
        else return -1;
    };
	/**
	 * 当前窗体下分栏数量
	 */
    WaterFall.prototype.computeNumberOfColumns = function() {
    		var self = this;
        var num = Math.floor(self.container.width() / self.config.minBoxWidth);
        num = num || 1; // at least one column
        return num;
    };
	/**
	 * 给每个栏目添加div和设置div的宽度（%）
	 * @param {Object} num
	 */
    WaterFall.prototype.initColumns = function(num) {
    		var self = this;
        if(num > 0) {
            // create column div
            self.columns = [];
            var width = (100 / num) + '%';
            while(num--) {
                var column = document.createElement('div');
                column.className = self.config.columClass;
                column.style.width = width;
                self.columns.push(column);
                self.container.append(column);
            }
        }
    };
	/**
	 *瀑布流栏目生成 
	 * @param {Object} force
	 */
    WaterFall.prototype.compose = function(force) {
    		var self = this,
        		num = self.computeNumberOfColumns(),
        		cols = self.columns.length;
        if(force || num != cols) {
            //移除先前的分栏
            for (var i = 0; i < self.columns.length; i++) {
                var columnElem = self.columns[i];
                columnElem.remove();
            }
            //新分栏数操作 
            self.initColumns(num);
            //分栏生成
            for (var i = 0, l = self.boxes.length; i < l; i++) {
                var box = self.boxes[i];
                self.addBox(box);
            }
        }
    };
    /**
     * 给分栏添加box
     * @param {Object} elem
     */
    WaterFall.prototype.addBox = function(elem) {
    		var self = this;
        // push if new box
        if(self.boxes.indexOf(elem) < 0) self.boxes.push(elem);
        var columnIndex = self.minHeightIndex();
        if(columnIndex > -1) {
            var column = self.columns[columnIndex];
            $(column).append(elem);
        }
    };
    /**
     * 元素与屏幕高度判断  
     * 返回值为boolean类型
     * @param {Object} elem
     */
     WaterFall.prototype.isSlide = function(elem) {
        if(elem) {
            var documentHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
			var elemHeight = $(elem).offset().top + $(elem).height()/2;
            return elemHeight < documentHeight; //返回true or false
        }
    };
	
	window.WaterFall = WaterFall;
}();


var App = (function(){
	//瀑布流调用
	var waterfallTpl = _.template($("#waterfallTpl").html());
	var setWaterfall = function(){
		var page =1;
		var wf = new WaterFall({
			minBoxWidth : (parseInt($(window).width())-16)/2,
			containerSelector : ".container",
			columClass : "column",
			boxSelector : ".item",
			action:function(){		
				//ajax获取数据
				 $.post("test/getList",{pageNum:page++},function(data){					
				 	if(data.isSuccess){
	  	 				//console.log("请求成功！");
				 		for(var i=0,len=data.list.length; i<len; i++){
				 			var tpl = waterfallTpl(data.list[i]);
				 			wf.addBox(tpl);
				 		}
				 		wf.isLoading = true;
				 	}else{
				 		//console.log("没有了");
				 		$(".tips").show();
				 		wf.isLoading = false;
				 	}
				 },"json");		 
				wf.isLoading = false;
			}
		});
	}
	
	return{
		handleWaterfall:function(){
			setWaterfall();
		}
	}
	
})();
//全局调用
$(function(){
	//瀑布流模块调用	
	App.handleWaterfall();
})



/**
 *simple 
 */
/*
 * @瀑布流组件
 * @auther kunyujie.com
 * @method  WaterFall  
 * @description 默认配置参数   
 * @param {Object} containerSelector -父容器
 * @param {Object} boxSelector -item dom 
 * @param {Function} callBack -回调函数 
*
*/  
! function WaterFall(){
	function WaterFall(cfg){
		this.config = {
			containerSelector : ".container",
			boxSelector : ".item",
			action: null
		};
		this.config = $.extend(this.config,cfg);
		this.isLoading = true;
		this.container = $(this.config.containerSelector);
		this.boxes = this.container ? Array.prototype.slice.call($(this.config.boxSelector)) : [];
		this.init();
		return this;
	}
	
	/**
	 *init 
	 */
	WaterFall.prototype.init = function(){
		var self = this;
		$(window).off().on("scroll",function(){
			self.scrollEvent()
		});
	}
    /**
     * ajax数据调用
     */
   WaterFall.prototype.scrollEvent = function() {
   		var self = this;
        //获取分栏的最后一个div
		var lastBox = $("."+self.config.containerSelector).find(self.config.boxSelector+":last");
        if(self.isSlide(lastBox) && self.isLoading){
           callback(); 
        }
        	//外部回调
        function callback() {
            if (self.config.action && typeof self.config.action === 'function') {
                self.config.action();
            }
        }
   };
   /**
     * 给分栏添加box
     * @param {Object} elem
     */
    WaterFall.prototype.addBox = function(elem) {
    		var self = this;
		$("."+self.config.containerSelector).append(elem);
    };
    /**
     * 元素与屏幕高度判断  
     * 返回值为boolean类型
     * @param {Object} elem
     */
     WaterFall.prototype.isSlide = function(elem) {
        if(elem) {
            var documentHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
			var elemHeight = $(elem).offset().top + $(elem).height()/2;
            return elemHeight < documentHeight; //返回true or false
        }
    };
	
	window.WaterFall = WaterFall;
}();


/**
* jquery
*/
$(window).on("scroll",function(){
    // 判断窗口的滚动条是否接近页面底部
    if( $(document).scrollTop() + $(window).height() > $(document).height() - 10 ){
	if(currentPage != totalPage&&flag){
		currentPage = currentPage +1;
		//loading show()
		//ajax()
	}
    }
});


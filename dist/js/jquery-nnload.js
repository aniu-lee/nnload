/**
 * Created by aniulee on 2016/7/24 0024.
 * 滚动加载更多插件
 */
;(function($){
    'use strict';
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);

    $.fn.nnload = function(options){
        return new MoreLoad(this,options);
    }
    var MoreLoad = function(element,options){
        var me = this;
        me.element = element;
        //加载状态
        me.loading = false;
        // 是否有数据
        me.isData = true;
        //是否自动加载 默认是
        me.autoLoad = true;
        me._threshold = 0;
        me.init(options);
    }

    MoreLoad.prototype.init = function(options){
        var me = this;
        me.opts = $.extend({},{
            'autoLoad':me.autoLoad,
            'btn_more_class':"loading-more",
            'threshold':me._threshold,//提前加载
            'loading_class':'loading',//loading
            'content_class':'list',//填充数据
            'loading_msg':"<div class='loading-ing'></div><div class='loading-ing'></div><div class='loading-ing'></div>",//加载数据提示信息
            'noData_msg':"<div class='loading-success'>加载完成</div>",
            'loadData':''//加载数据callback
        },options);

        me.element.append("<div class='"+me.opts.loading_class+"'>");

        if( $doc.height()==$win.height() && me.isData==true && me.loading==false){
            getData(me);
        }

       $('.loading').on('click','.loading-more',function(){
           getData(me);
       });

        $win.on('scroll', function () {
            //当内容滚动到底部时加载新的内容
            if ($win.scrollTop() + $win.height() + me.opts.threshold >= $doc.height() && $win.scrollTop() > me.opts.threshold) {
                if(!me.loading && me.isData){
                    if(me.opts.autoLoad){
                        getData(me);
                    }else{
                        $('.'+me.opts.loading_class).html("<div class='"+me.opts.btn_more_class+"'>点击加载更多</div>");
                    }
                }
            }
        });

    };

    /**
     * 是否已加载完成 true 代表已没数据了
     * @param flag
     */
    MoreLoad.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.isData = true;
        }else if(flag == false){
            me.isData = false;
        }
    }

    /**
     * 重置
     */
    MoreLoad.prototype.resetLoad = function(){
        var me = this;
        if(me.loading){
            me.loading=false;
        }
        // 如果有数据
        if(me.isData){
            me.isData=true;
            // 加载区修改样式
            $('.'+me.opts.loading_class).html("");
        }else{
            me.isData=false;
            // 如果没数据
            $('.'+me.opts.loading_class).html(me.opts.noData_msg);
        }
        //判断宽带满了没
        if( $doc.height()<=$win.height() && me.isData==true && me.loading==false){
            getData(me);
         }
    }

    /**
     * 获取数据
     * @param me
     */
    function getData(me){
        me.loading = true;
        $('.'+me.opts.loading_class).html(me.opts.loading_msg);
        me.opts.loadData(me);
    }

})(jQuery);
/**
 * 移动端多屏适配
 * 来源阿里手淘
 */
;(function(win, lib) {
    var doc = win.document;
    // 文档根元素
    var docEl = doc.documentElement;
    // <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0;"/>
    var metaEl = doc.querySelector('meta[name="viewport"]');
    // <meta name="flexible" content="initial-dpr=2,maximum-dpr=3" />
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0; // 设备像素比
    var scale = 0; // 缩放倍数
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    var devicePixelRatio = win.devicePixelRatio || 1;

    if (metaEl) {
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]); // scale 设置为默认默认的倍数
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);

            // 根据meta:flexible 设置的initial设置 dpr 和 scale
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }

            // 如果存在maximum-dpr，会覆盖掉initial-dpr的设置
            if (maximumDpr) {
                // 在真实设备像素比 和 maximumDpr 中选择小的
                dpr = parseFloat(maximumDpr[1]) < devicePixelRatio ? maximumDpr[1] : devicePixelRatio;
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = 1;
        }

        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width; 
        if (width / dpr > 750) {
	      width = 750 * dpr
	    }
    	var rem = 100 * (width / 750)
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    // IE11+
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));

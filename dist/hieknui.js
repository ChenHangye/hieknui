var huConfig = {
    namespace: 'hu-'
};

var huBackTop = (function () {
    function huBackTop() {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.namespace = '';
        this.namespace = huConfig.namespace;
        this.attrName = this.namespace + 'data-pos';
        this.clsName = this.namespace + 'backtop';
        this.cls = '.' + this.clsName;
        this.init();
    }
    huBackTop.prototype.init = function () {
        var _this = this;
        $(window).scroll(function (event) {
            var height = document.body.scrollTop || document.documentElement.scrollTop;
            $(_this.cls).toggleClass('on', height > 500);
        });
        $('body').on('click', this.cls, function (event) {
            var pos = $(event.currentTarget).attr(_this.attrName) || 0;
            $("html,body").animate({ scrollTop: pos }, 300);
        });
    };
    return huBackTop;
}());

var huDropdown = (function () {
    function huDropdown() {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.itemsCls = '';
        this.namespace = '';
        this.valueName = '';
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'dropdown';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'select-dropdown';
        this.init();
    }
    huDropdown.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + ':not(.disabled)>span', function (event) {
            var $item = $(event.currentTarget);
            var id = $item.attr(_this.attrName);
            if (!id) {
                id = _this.namespace + huUtils.randomId();
                $item.attr(_this.attrName, id);
                var $container = $item.closest(_this.cls);
                var cls = 'inactive ';
                if ($container.hasClass('dropdown-xs')) {
                    cls += 'dropdown-xs';
                }
                else if ($container.hasClass('dropdown-sm')) {
                    cls += 'dropdown-sm';
                }
                else if ($container.hasClass('dropdown-md')) {
                    cls += 'dropdown-md';
                }
                else if ($container.hasClass('dropdown-lg')) {
                    cls += 'dropdown-lg';
                }
                $item.siblings(_this.itemsCls).attr(_this.attrName, id).attr('data-role', 'dropdown').addClass(cls).appendTo('body');
            }
            var offset = $item.offset();
            var left = offset.left;
            var top = offset.top + $item.outerHeight() + 4;
            $(_this.itemsCls + '[' + _this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('active inactive');
        }).on('click', this.itemsCls + '>li:not(.disabled)', function (event) {
            var $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
        }).on('click', function (event) {
            if (!$(event.target).closest(_this.cls).length) {
                $('.active[data-role="dropdown"]' + _this.itemsCls).removeClass('active').addClass('inactive');
            }
        });
    };
    return huDropdown;
}());

$(function () {
    new huTabs();
    new huDropdown();
    new huSelect();
    new huTag();
    new huBackTop();
});

var huPagination = (function () {
    function huPagination(config) {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.defaultConfig = {
            callback: $.noop,
            cls: '',
            current: 1,
            jumpEnable: false,
            prevNextEnable: false,
            prevNextMultiEnable: false,
            selector: '',
            showNum: 9,
            startEndEnable: true,
            totalItemShow: false
        };
        this.namespace = '';
        this.config = $.extend(true, {}, this.defaultConfig, config);
        if (!this.config.total) {
            if (!this.config.totalItem || !this.config.pageSize) {
                huUtils.error('total或totalItem与pageSize不能同时为空');
            }
            else {
                this.config.total = Math.ceil(this.config.totalItem / this.config.pageSize);
            }
        }
        if (!this.config.selector) {
            huUtils.error('selector不能为空');
        }
        else {
            this.namespace = huConfig.namespace;
            this.clsName = this.namespace + 'pagination';
            this.attrName = this.namespace + 'page';
            this.cls = '.' + this.clsName;
            this.$container = $(this.config.selector);
            if (this.$container.is('ul')) {
                if (!this.$container.hasClass(this.clsName)) {
                    this.$container.addClass(this.clsName);
                }
            }
            else {
                var container = "<ul class=\"" + this.clsName + "\"></ul>";
                this.$container.html(container);
                this.$container = this.$container.find(this.cls);
            }
            this.$container.addClass(this.config.cls);
            this.init();
        }
    }
    huPagination.prototype.init = function () {
        this.buildHTML();
        this.bindEvent();
    };
    huPagination.prototype.buildHTML = function () {
        var total = this.config.total;
        var cur = Math.floor(this.config.current);
        var html = '';
        if (total == 0) {
            html = '';
        }
        else if (total < cur) {
            html = '';
            huUtils.error('当前页数不能大于总页数');
        }
        else {
            var all = this.config.showNum;
            var half = (this.config.showNum - 1) / 2;
            var first = 1;
            var last = total;
            var prevNextEnable = this.config.prevNextEnable;
            var prevNextMultiEnable = this.config.prevNextMultiEnable;
            var startEndEnable = this.config.startEndEnable;
            var jumpEnable = this.config.jumpEnable;
            var totalItemShow = this.config.totalItemShow;
            if (last > all) {
                if (cur - half > 1) {
                    first = Math.ceil(cur - half);
                }
                if (last - cur < half) {
                    first = last - all + 1;
                }
                else {
                    last = first + all - 1;
                }
            }
            var firstEnable = cur != 1;
            var firstEnableCls = firstEnable ? '' : 'disabled';
            var lastEnable = cur != total;
            var lastEnableCls = lastEnable ? '' : 'disabled';
            totalItemShow && (html += "<li class=\"page-total\">\u5171\u8BA1" + this.config.totalItem + "\u4E2A</li>");
            startEndEnable && (html += "<li class=\"page-item page-first " + firstEnableCls + "\" " + this.attrName + "=\"1\" title=\"\u9996\u9875\"></li>");
            prevNextMultiEnable && (html += "<li class=\"page-item page-prev-multi " + firstEnableCls + "\" " + this.attrName + "=\"" + ((cur - all) < 1 ? 1 : (cur - all)) + "\" title=\"\u5F80\u524D\u7FFB" + all + "\u9875\"></li>");
            prevNextEnable && (html += "<li class=\"page-item page-prev " + firstEnableCls + "\" " + this.attrName + "=\"" + ((cur - 1) < 1 ? 1 : (cur - 1)) + "\" title=\"\u4E0A\u4E00\u9875\"></li>");
            for (var i = first; i <= last; i++) {
                html += "<li class=\"page-item " + (i == cur ? 'active' : '') + "\" " + this.attrName + "=\"" + i + "\">" + i + "</li>";
            }
            prevNextEnable && (html += "<li class=\"page-item page-next " + lastEnableCls + "\" " + this.attrName + "=\"" + ((cur + 1) > total ? total : (cur + 1)) + "\" title=\"\u4E0B\u4E00\u9875\"></li>");
            prevNextMultiEnable && (html += "<li class=\"page-item page-next-multi " + lastEnableCls + "\" " + this.attrName + "=\"" + ((cur + all) > total ? total : (cur + all)) + "\" title=\"\u5F80\u540E\u7FFB" + all + "\u9875\"></li>");
            startEndEnable && (html += "<li class=\"page-item page-last " + lastEnableCls + "\" " + this.attrName + "=\"" + total + "\" title=\"\u672B\u9875\"></li>");
            jumpEnable && (html += "<li class=\"page-jump\"><span>\u8DF3\u8F6C\u5230</span><input type=\"number\" min=\"1\" max=\"" + total + "\" step=\"1\" class=\"" + this.namespace + "input\" value=\"" + cur + "\"><span>\u9875</span></li>");
        }
        this.$container.html(html);
    };
    huPagination.prototype.bindEvent = function () {
        var _this = this;
        this.$container.off();
        this.$container.on('click', 'li:not(.disabled)[' + this.attrName + ']', { eventData: this.config.data }, function (event) {
            var eventData = event.data.eventData;
            var pageNo = $(event.currentTarget).attr(_this.attrName);
            _this.config.callback(event, pageNo, eventData);
        });
        this.$container.on('click', 'li.page-jump button', { eventData: this.config.data }, function (event) {
            var eventData = event.data.eventData;
            var pageNo = $(event.currentTarget).prev('input').val();
            _this.goTo(event, pageNo, eventData);
        });
        this.$container.on('keyup', 'li.page-jump input', { eventData: this.config.data }, function (event) {
            var pageNo = $(event.currentTarget).val();
            var re = /^[0-9]*$/;
            if (pageNo == '') {
            }
            else if (!re.test(pageNo + '')) {
                var old = $(event.currentTarget).data('data');
                $(event.currentTarget).val(old);
            }
            else if (pageNo > _this.config.total) {
                $(event.currentTarget).val(_this.config.total);
            }
            else if (pageNo < 1) {
                $(event.currentTarget).val(1);
            }
        });
        this.$container.on('keydown', 'li.page-jump input', { eventData: this.config.data }, function (event) {
            var code = event.keyCode || event.which || event.charCode;
            var pageNo = $(event.currentTarget).val();
            if (code == 13) {
                var eventData = event.data.eventData;
                _this.goTo(event, pageNo, eventData);
            }
            else {
                $(event.currentTarget).data('data', pageNo);
            }
        });
    };
    huPagination.prototype.goTo = function (event, pageNo, eventData) {
        if (pageNo <= this.config.total && pageNo > 0) {
            this.config.callback(event, pageNo, eventData);
        }
        else {
            huUtils.error('跳转页不存在');
        }
    };
    return huPagination;
}());

var huSelect = (function () {
    function huSelect() {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.itemsCls = '';
        this.namespace = '';
        this.valueName = '';
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'select';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'select-dropdown';
        this.init();
    }
    huSelect.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + ':not(.disabled)>span', function (event) {
            var $item = $(event.currentTarget);
            var id = $item.attr(_this.attrName);
            if (!id) {
                id = _this.namespace + huUtils.randomId();
                $item.attr(_this.attrName, id);
                var $container = $item.closest(_this.cls);
                var cls = 'inactive ';
                if ($container.hasClass('select-xs')) {
                    cls += 'select-xs';
                }
                else if ($container.hasClass('select-sm')) {
                    cls += 'select-sm';
                }
                else if ($container.hasClass('select-md')) {
                    cls += 'select-md';
                }
                else if ($container.hasClass('select-lg')) {
                    cls += 'select-lg';
                }
                $item.siblings(_this.itemsCls).attr(_this.attrName, id).attr('data-role', 'select').addClass(cls).appendTo('body');
            }
            var offset = $item.offset();
            var left = offset.left;
            var top = offset.top + $item.outerHeight() + 4;
            $(_this.itemsCls + '[' + _this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('active inactive');
        }).on('click', this.itemsCls + '>li:not(.disabled)', function (event) {
            var $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
            var id = $item.parent().attr(_this.attrName);
            var value = $item.attr(_this.valueName);
            var text = $item.text();
            $(_this.cls + ' span[' + _this.attrName + '="' + id + '"]').text(text).attr(_this.valueName, value);
        }).on('click', function (event) {
            if (!$(event.target).closest(_this.cls).length) {
                $('.active[data-role="select"]' + _this.itemsCls).removeClass('active').addClass('inactive');
            }
        });
    };
    return huSelect;
}());

var huTabs = (function () {
    function huTabs() {
        huTabs.namespace = huConfig.namespace;
        huTabs.clsName = huTabs.namespace + 'tabs';
        huTabs.cls = '.' + huTabs.clsName;
        huTabs.init();
    }
    huTabs.bindEvent = function () {
        var xPath = '>.tabs-nav-container:not(.show-all)>.tabs-wrap';
        $('body').on('click', huTabs.cls + '>li:not(.disabled)', function (event) {
            var $tab = $(event.currentTarget);
            var selector = $tab.find('a').attr('href');
            $tab = $('a[href="' + selector + '"]').closest('li');
            var $page = $(selector);
            var $pageOld = $page.siblings('.active');
            var selectorOld = '#' + $pageOld.attr('id');
            var $tabOld = $('a[href="' + selectorOld + '"]').closest('li');
            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');
            $tab.each(function (i, v) {
                huTabs.resize($(v).closest(huTabs.cls));
                // huTabs.resetDecorationPos($item);
            });
        }).on('click', '.tabs-prev-control:not(.disabled)', function (event) {
            var $item = $(event.currentTarget);
            var $wrap = $item.siblings('.tabs-wrap');
            var isVertical = huTabs.isVertical($item);
            var f = 'outerWidth';
            if (isVertical) {
                f = 'outerHeight';
            }
            var wSize = $wrap[f]();
            huTabs.resetPos($wrap, wSize, isVertical);
        }).on('click', '.tabs-next-control:not(.disabled)', function (event) {
            var $item = $(event.currentTarget);
            var $wrap = $item.siblings('.tabs-wrap');
            var isVertical = huTabs.isVertical($item);
            var f = 'outerWidth';
            if (isVertical) {
                f = 'outerHeight';
            }
            var wSize = $wrap[f]();
            huTabs.resetPos($wrap, -wSize, isVertical);
        }).on('mousewheel', '.tabs-left' + xPath + ',.tabs-right' + xPath, function (event) {
            var $wrap = $(event.currentTarget);
            huTabs.resetPos($wrap, event.deltaY * event.deltaFactor, true);
        });
        $(window).resize(function (event) {
            huTabs.resizeAll();
        });
    };
    huTabs.calcEnable = function ($item, pPos) {
        var $wrap = $item.parent();
        var f = 'width';
        var cssAttr = 'margin-left';
        if (huTabs.isVertical($item)) {
            f = 'height';
            cssAttr = 'margin-top';
        }
        pPos = typeof pPos == 'undefined' ? parseInt($item.css(cssAttr)) : pPos;
        return { prev: pPos < 0, next: $wrap[f]() - pPos < $item[f]() };
    };
    huTabs.init = function () {
        huTabs.bindEvent();
        huTabs.resizeAll();
    };
    huTabs.isVertical = function ($item) {
        return $item.closest('.tabs-nav-container').parent('.tabs-left,.tabs-right').length > 0;
    };
    huTabs.resetAllClickable = function () {
        $(huTabs.cls).each(function (i, v) {
            huTabs.resetClickable($(v));
        });
    };
    huTabs.resetClickable = function ($item, prevEnable, nextEnable) {
        if (typeof prevEnable == 'undefined' || typeof nextEnable == 'undefined') {
            var status_1 = huTabs.calcEnable($item);
            prevEnable = status_1.prev;
            nextEnable = status_1.next;
        }
        var $wrap = $item.parent();
        $wrap.siblings('.tabs-prev-control').toggleClass('disabled', !prevEnable);
        $wrap.siblings('.tabs-next-control').toggleClass('disabled', !nextEnable);
    };
    huTabs.resetDecorationPos = function ($item) {
        var isVertical = huTabs.isVertical($item);
        var fun = 'width';
        var sizeFun = 'outerWidth';
        var posFixFun = 'outerHeight';
        var posChangeAtt = 'left';
        if (isVertical) {
            fun = 'height';
            sizeFun = 'outerHeight';
            posFixFun = 'outerWidth';
            posChangeAtt = 'top';
        }
        var size = $item[sizeFun]();
        var posFix = $item[posFixFun]();
        var posChange = $item.position()[posChangeAtt] + $item.parent().position()[posChangeAtt] + parseInt($item.parent().css('margin-' + posChangeAtt));
        var $decoration = $item.closest('.tabs-wrap').siblings('.tabs-decoration');
        $decoration[fun](size);
        $decoration.css(posChangeAtt, posChange);
        console.log($item, $decoration, size, posFix, posChange);
    };
    huTabs.resetPos = function ($wrap, deltaPos, isVertical) {
        var $ul = $wrap.children('ul');
        var f = 'outerWidth';
        var cssAttr = 'margin-left';
        if (isVertical) {
            f = 'outerHeight';
            cssAttr = 'margin-top';
        }
        var wSize = $wrap[f]();
        var uSize = $ul[f]() - wSize;
        var pos = parseInt($ul.css(cssAttr));
        var newPos = pos + deltaPos;
        var tarPos = newPos > -uSize ? newPos : -uSize;
        tarPos = tarPos < 0 ? tarPos : 0;
        $ul.css(cssAttr, tarPos);
        huTabs.resetClickable($ul, tarPos !== 0, tarPos !== -uSize);
    };
    huTabs.resizeAll = function () {
        huTabs.wrapAll();
        $(huTabs.cls).each(function (i, v) {
            huTabs.resize($(v));
        });
    };
    huTabs.resize = function ($item) {
        var f = 'width';
        var of = 'outerWidth';
        var type = 'left';
        var cssAttr = 'margin-' + type;
        if (huTabs.isVertical($item)) {
            f = 'height';
            of = 'outerHeight';
            type = 'top';
            cssAttr = 'margin-' + type;
        }
        var lis = 0;
        $item.children('li').each(function (j, li) {
            lis += $(li)[of]();
        });
        var $navContainer = $item.closest('.tabs-nav-container');
        var l = $navContainer[f]();
        $navContainer.toggleClass('show-all', l >= lis);
        if (l < lis) {
            $item[f](lis);
            var $active = $item.children('li.active');
            var pos = $active.position()[type];
            var pPos = parseInt($item.css(cssAttr));
            if (pos + pPos < 0) {
                pPos = -pos;
            }
            else if ((pos + $active[of]() + pPos) > l) {
                pPos = l - $active[of]() - pos;
            }
            var pSize = $item[f]();
            if (l > (pSize + pPos) && pPos < 0) {
                pPos = l - pSize;
            }
            $item.css(cssAttr, pPos);
            var status_2 = huTabs.calcEnable($item, pPos);
            huTabs.resetClickable($item, status_2.prev, status_2.next);
        }
    };
    huTabs.wrapAll = function () {
        $(huTabs.cls).each(function (i, v) {
            huTabs.wrap($(v));
        });
    };
    huTabs.wrap = function ($item) {
        if (!$item.parent('.tabs-wrap').length) {
            var wrap = '<div class="tabs-wrap"></div>';
            var container = '<div class="tabs-nav-container"></div>';
            var decoration = ''; //'<div class="tabs-decoration"></div>';
            var controls = decoration + '<div class="tabs-control tabs-prev-control"></div><div class="tabs-control tabs-next-control"></div>';
            $item.wrap(container).after(controls).wrap(wrap);
        }
    };
    huTabs.cls = '';
    huTabs.clsName = '';
    huTabs.namespace = '';
    return huTabs;
}());

var huTag = (function () {
    function huTag() {
        this.cls = '';
        this.clsName = '';
        this.namespace = '';
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'tag';
        this.cls = '.' + this.clsName;
        this.init();
    }
    huTag.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + ':not(.disabled) .close', function (event) {
            $(event.currentTarget).closest(_this.cls).remove();
        });
    };
    return huTag;
}());

var huUtils = (function () {
    function huUtils() {
    }
    huUtils.randomId = function (prefix, postfix) {
        if (prefix === void 0) { prefix = ''; }
        if (postfix === void 0) { postfix = ''; }
        return prefix + new Date().getTime() + Math.ceil(Math.random() * 1000) + postfix;
    };
    huUtils.error = function (msg) {
        console.error(msg);
    };
    return huUtils;
}());

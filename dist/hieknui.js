/**
     * @author: 
     *    jiangrun002
     * @version: 
     *    v0.0.3
     * @license:
     *    Copyright 2017, hiknowledge. All rights reserved.
     */

var huBackTop = (function () {
    function huBackTop(selector) {
        this.attrName = '';
        this.namespace = '';
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-pos';
        this.items = $(selector);
        this.init();
    }
    huBackTop.prototype.init = function () {
        var _this = this;
        $(window).scroll(function (event) {
            var height = document.body.scrollTop || document.documentElement.scrollTop;
            _this.items.toggleClass('on', height > 500);
        });
        this.items.each(function (i, v) {
            var pos = $(v).attr(_this.attrName) || 0;
            $(v).on('click', function (event) {
                $("html,body").animate({ scrollTop: pos }, 300);
            });
        });
    };
    return huBackTop;
}());

var config = {
    namespace: 'hu-'
};

var huDropdown = (function () {
    function huDropdown(selector) {
        this.attrName = '';
        this.valueName = '';
        this.itemName = '';
        this.itemsName = '';
        this.namespace = '';
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemName = this.namespace + 'dropdown';
        this.itemsName = this.namespace + 'dropdown-items';
        this.items = $(selector);
        this.init();
    }
    huDropdown.prototype.init = function () {
        var _this = this;
        this.items.each(function (i, v) {
            if (!$(v).attr(_this.attrName)) {
                var id = _this.namespace + huUtils.randomId();
                $(v).attr(_this.attrName, id);
                $(v).children('ul').attr(_this.attrName, id);
                $(v).find('.' + _this.itemsName).on('click', 'li', function (event) {
                    var $item = $(event.currentTarget);
                    $item.addClass('active').siblings('.active').removeClass('active');
                }).appendTo($('body'));
                $(v).on('click', '>span', function (event) {
                    var $item = $(event.currentTarget);
                    var offset = $item.offset();
                    var left = offset.left;
                    var top = offset.top + $item.outerHeight() + 4;
                    var id = $item.parent().attr(_this.attrName);
                    $('.' + _this.itemsName + '[' + _this.attrName + '="' + id + '"]').css({
                        top: top,
                        left: left,
                        width: $item.outerWidth()
                    }).toggleClass('on');
                });
            }
        });
        $('body').on('click', function (event) {
            if (!$(event.target).closest('.' + _this.itemName).length) {
                $('.on.' + _this.itemsName).removeClass('on');
            }
        });
    };
    return huDropdown;
}());


var huMask = (function () {
    function huMask(cls) {
        if (cls === void 0) { cls = ''; }
        this.namespace = '';
        this.cls = '';
        this.namespace = config.namespace;
        this.cls = cls;
        this.init();
    }
    huMask.prototype.init = function () {
        this.item = $('<div class="' + this.namespace + 'mask ' + this.cls + '"></div>');
        $('body').append(this.item);
    };
    return huMask;
}());

var huSelect = (function () {
    function huSelect(selector) {
        this.attrName = '';
        this.valueName = '';
        this.itemName = '';
        this.itemsName = '';
        this.namespace = '';
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemName = this.namespace + 'select';
        this.itemsName = this.namespace + 'select-items';
        this.items = $(selector);
        this.init();
    }
    huSelect.prototype.init = function () {
        var _this = this;
        this.items.each(function (i, v) {
            if (!$(v).attr(_this.attrName)) {
                var id = _this.namespace + huUtils.randomId();
                $(v).attr(_this.attrName, id);
                $(v).children('ul').attr(_this.attrName, id);
                $(v).find('.' + _this.itemsName).on('click', 'li', function (event) {
                    var $item = $(event.currentTarget);
                    $item.addClass('active').siblings('.active').removeClass('active');
                    var id = $item.parent().attr(_this.attrName);
                    var value = $item.attr(_this.valueName);
                    var text = $item.text();
                    $('.' + _this.itemName + '[' + _this.attrName + '="' + id + '"] span').text(text).attr(_this.valueName, value);
                }).appendTo($('body'));
                $(v).on('click', '>span', function (event) {
                    var $item = $(event.currentTarget);
                    var offset = $item.offset();
                    var left = offset.left;
                    var top = offset.top + $item.outerHeight() + 4;
                    var id = $item.parent().attr(_this.attrName);
                    $('.' + _this.itemsName + '[' + _this.attrName + '="' + id + '"]').css({
                        top: top,
                        left: left,
                        width: $item.outerWidth()
                    }).toggleClass('on');
                });
            }
        });
        $('body').on('click', function (event) {
            if (!$(event.target).closest('.' + _this.itemName).length) {
                $('.on.' + _this.itemsName).removeClass('on');
            }
        });
    };
    return huSelect;
}());

var huTabs = (function () {
    function huTabs(selector) {
        this.namespace = '';
        this.namespace = config.namespace;
        this.$container = $(selector);
        this.init();
    }
    huTabs.prototype.bindEvent = function () {
        this.$container.children('li').on('click', function (event) {
            var $tab = $(event.currentTarget);
            var $tabOld = $tab.siblings('.active');
            var selector = $tab.find('a').attr('href');
            var selectorOld = $tabOld.find('a').attr('href');
            var $page = $(selector);
            var $pageOld = $(selectorOld);
            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');
        });
    };
    huTabs.prototype.init = function () {
        this.bindEvent();
    };
    huTabs.prototype.select = function (selector) {
        return this.$container.find(selector);
    };
    return huTabs;
}());

var huTag = (function () {
    function huTag(selector) {
        this.namespace = '';
        this.namespace = config.namespace;
        this.items = $(selector);
        this.init();
    }
    huTag.prototype.init = function () {
        this.items.each(function (i, v) {
            $(v).find('i.close').on('click', function (event) {
                $(event.currentTarget).closest('.tag-action').remove();
            });
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
    return huUtils;
}());

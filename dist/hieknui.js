/**
     * @author: 
     *    jiangrun002
     * @version: 
     *    v0.0.3
     * @license:
     *    Copyright 2017, hiknowledge. All rights reserved.
     */

var config = {
    namespace: 'hu-'
};

var huBackTop = (function () {
    function huBackTop() {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.namespace = '';
        this.namespace = config.namespace;
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
        this.namespace = config.namespace;
        this.clsName = this.namespace + 'dropdown';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'dropdown-items';
        this.init();
    }
    huDropdown.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + '>span', function (event) {
            var $item = $(event.currentTarget);
            var id = $item.attr(_this.attrName);
            if (!id) {
                id = _this.namespace + huUtils.randomId();
                $item.attr(_this.attrName, id);
                $item.siblings(_this.itemsCls).attr(_this.attrName, id).appendTo('body');
            }
            var offset = $item.offset();
            var left = offset.left;
            var top = offset.top + $item.outerHeight() + 4;
            $(_this.itemsCls + '[' + _this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('on');
        }).on('click', this.itemsCls + '>li', function (event) {
            var $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
        }).on('click', function (event) {
            if (!$(event.target).closest(_this.cls).length) {
                $('.on' + _this.itemsCls).removeClass('on');
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

var huSelect = (function () {
    function huSelect() {
        this.attrName = '';
        this.cls = '';
        this.clsName = '';
        this.itemsCls = '';
        this.namespace = '';
        this.valueName = '';
        this.namespace = config.namespace;
        this.clsName = this.namespace + 'select';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'select-items';
        this.init();
    }
    huSelect.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + '>span', function (event) {
            var $item = $(event.currentTarget);
            var id = $item.attr(_this.attrName);
            if (!id) {
                id = _this.namespace + huUtils.randomId();
                $item.attr(_this.attrName, id);
                $item.siblings(_this.itemsCls).attr(_this.attrName, id).appendTo('body');
            }
            var offset = $item.offset();
            var left = offset.left;
            var top = offset.top + $item.outerHeight() + 4;
            $(_this.itemsCls + '[' + _this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('on');
        }).on('click', this.itemsCls + '>li', function (event) {
            var $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
            var id = $item.parent().attr(_this.attrName);
            var value = $item.attr(_this.valueName);
            var text = $item.text();
            $(_this.cls + ' span[' + _this.attrName + '="' + id + '"]').text(text).attr(_this.valueName, value);
        }).on('click', function (event) {
            if (!$(event.target).closest(_this.cls).length) {
                $('.on' + _this.itemsCls).removeClass('on');
            }
        });
    };
    return huSelect;
}());

var huTabs = (function () {
    function huTabs() {
        this.cls = '';
        this.clsName = '';
        this.namespace = '';
        this.namespace = config.namespace;
        this.clsName = this.namespace + 'tabs';
        this.cls = '.' + this.clsName;
        this.init();
    }
    huTabs.prototype.init = function () {
        $('body').on('click', this.cls + '>li', function (event) {
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
    return huTabs;
}());

var huTag = (function () {
    function huTag() {
        this.cls = '';
        this.clsName = '';
        this.namespace = '';
        this.namespace = config.namespace;
        this.clsName = this.namespace + 'tag';
        this.cls = '.' + this.clsName;
        this.init();
    }
    huTag.prototype.init = function () {
        var _this = this;
        $('body').on('click', this.cls + ' .close', function (event) {
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
    return huUtils;
}());

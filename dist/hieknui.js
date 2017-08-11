/**
     * @author: 
     *    jiangrun002
     * @version: 
     *    v0.0.1
     * @license:
     *    Copyright 2017, hiknowledge. All rights reserved.
     */

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
                    var id = $item.parent().attr(_this.attrName);
                    var v = $item.attr(_this.valueName);
                    var value = v === undefined ? $item.text() : v;
                    $('.' + _this.itemName + '[' + _this.attrName + '="' + id + '"] span').text(value);
                }).appendTo($('body'));
                $(v).on('click', '>span', function (event) {
                    var offset = $(event.currentTarget).offset();
                    var left = offset.left;
                    var top = offset.top + $(event.currentTarget).outerHeight() + 4;
                    var id = $(event.currentTarget).parent().attr(_this.attrName);
                    $('.' + _this.itemsName + '[' + _this.attrName + '="' + id + '"]').css({
                        top: top,
                        left: left
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

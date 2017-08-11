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



var tabs = (function () {
    function tabs(selector) {
        this.namespace = '';
        this.namespace = config.namespace;
        this.$container = $(selector);
        this.init();
    }
    tabs.prototype.bindEvent = function () {
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
    tabs.prototype.init = function () {
        this.bindEvent();
    };
    tabs.prototype.select = function (selector) {
        return this.$container.find(selector);
    };
    return tabs;
}());

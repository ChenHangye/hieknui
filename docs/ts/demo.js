var demo = (function () {
    function demo() {
        this.formUtils = {
            defaultData: {
                radio: '1',
                checkbox1: ['1', '2'],
                checkbox2: true,
                input1: ['a', 'b'],
                textarea1: ['a1', 'b1'],
                input2: 'c',
                textarea2: 'c1',
                tag: ['tag1', 'tag2'],
                swicth: true,
                select: '1'
            },
            get: function ($form) {
                return huForm.getFormData($form);
            },
            set: function ($form, data) {
                huForm.setFormData($form, data);
            }
        };
        this.init();
    }
    demo.prototype.init = function () {
        location.hash && $('a[href="' + location.hash + '"]').parent().trigger('click');
        this.gentPage1(1);
        this.gentPage2(1);
        this.gentPage3(15);
        this.copy();
        this.setFormUtilsDocs();
        demo.highlight($('#form'), $('#form')[0].outerHTML, js_beautify(demo.stringify(this.formUtils)));
    };
    demo.prototype.gentPage1 = function (current) {
        var _this = this;
        var config = {
            data: {
                id: 1
            },
            cls: '',
            selector: '#page-1',
            totalItem: 165,
            totalItemShow: true,
            pageSize: 10,
            showNum: 0,
            current: current,
            prevNextEnable: true,
            startEndEnable: false,
            jumpEnable: true,
            callback: function (event, pageNo, data) {
                _this.gentPage1(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    };
    demo.prototype.gentPage2 = function (current) {
        var _this = this;
        var config = {
            data: {
                id: 2
            },
            selector: '#page-2',
            total: 17,
            showNum: 0,
            current: current,
            prevNextEnable: true,
            callback: function (event, pageNo, data) {
                _this.gentPage2(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    };
    demo.prototype.gentPage3 = function (current) {
        var _this = this;
        var config = {
            data: {
                id: 3
            },
            selector: '#page-3',
            total: 17,
            showNum: 8,
            current: current,
            prevNextEnable: true,
            prevNextMultiEnable: true,
            startEndEnable: false,
            callback: function (event, pageNo, data) {
                _this.gentPage3(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    };
    demo.prototype.copy = function () {
        var clipboard = new Clipboard('.icon');
        $('li').find('i').each(function () {
            $(this).attr('data-clipboard-text', this.outerHTML);
        });
        clipboard.on('success', function (e) {
            $('.prompt-success').show(200, function () {
                setTimeout(function () {
                    $('.prompt-success').hide(200);
                }, 500);
            });
        });
    };
    demo.prototype.setFormUtilsDocs = function () {
        var js = this.formUtils;
        $('#setvalue').on('click', function () {
            js.set($('#form'), js.defaultData);
        });
        $('#getvalue').on('click', function () {
            var formData = js.get($('#form'));
            console.log(formData);
            console.log(JSON.stringify(formData));
            console.log(JSON.stringify(js.defaultData));
            console.log(_.isEqual(formData, js.defaultData));
            $('#form-output').text(js_beautify(JSON.stringify(formData)));
            hljs.highlightBlock($('#form-output')[0]);
        });
    };
    demo.highlight = function ($item, html, js, css) {
        if (html === void 0) { html = ''; }
        if (js === void 0) { js = ''; }
        if (css === void 0) { css = ''; }
        var tabId1 = huUtils.randomId('code-tab');
        var tabId2 = huUtils.randomId('code-tab');
        var tabId3 = huUtils.randomId('code-tab');
        var tabHTML = "<div class=\"hu-card card-shadow code-demo\">\n                            <div class=\"hu-card-head\">\n                                <ul class=\"hu-tabs tabs-primary\">\n                                    <li class=\"active\"><a href=\"#" + tabId1 + "\">Demo</a></li>\n                                    <li class=\"\"><a href=\"#" + tabId2 + "\">HTML</a></li>\n                                    <li class=\"\"><a href=\"#" + tabId3 + "\">JAVASCRIPT</a></li>\n                                </ul>\n                            </div>\n                            <div class=\"hu-card-body\">\n                                <div class=\"hu-tab-content\">\n                                    <div class=\"tab-pane active\" id=\"" + tabId1 + "\">\n                                        " + html + "\n                                    </div>\n                                    <div class=\"tab-pane\" id=\"" + tabId2 + "\">\n                                        <pre><code class=\"html\"></code></pre>\n                                    </div>\n                                    <div class=\"tab-pane\" id=\"" + tabId3 + "\">\n                                        <pre><code class=\"javascript\">" + js + "</code></pre>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>";
        var $new = $(tabHTML);
        html = style_html(html);
        $new.find('code.html').text(html);
        $item.replaceWith($new);
        hljs.highlightBlock($new.find('code.html')[0]);
        hljs.highlightBlock($new.find('code.javascript')[0]);
    };
    demo.stringify = function (json) {
        if (!json) {
            return json;
        }
        var tmp = JSON.stringify(json, function (key, val) {
            if (typeof val === 'function') {
                var str = 'FUNC__START' + val + 'FUNC__END';
                str = str.replace(/\r|\n|\t/g, '');
                return str;
            }
            return val;
        });
        if (tmp) {
            return tmp.replace(/"FUNC__START/g, '').replace(/FUNC__END"/g, '');
        }
        else {
            return '';
        }
    };
    return demo;
}());
$(function () {
    new demo();
});

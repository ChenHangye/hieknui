declare const huPagination: any;
declare const huForm: any;
declare const huUtils: any;
declare const hljs: any;
declare const _: any;
declare const Clipboard: any;

class test {
    constructor() {
        this.init();
    }

    private init() {
        location.hash && $('a[href="' + location.hash + '"]').parent().trigger('click');
        this.gentPage1(1);
        this.gentPage2(1);
        this.gentPage3(15);
        this.copy();
        this.setFormTest();
        this.highlight($('#form'), $('#form')[0].outerHTML, this.setFormTest.toString());
    }

    private gentPage1(current) {
        const config = {
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
            callback: (event, pageNo, data) => {
                this.gentPage1(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    }

    private gentPage2(current) {
        const config = {
            data: {
                id: 2
            },
            selector: '#page-2',
            total: 17,
            showNum: 0,
            current: current,
            prevNextEnable: true,
            callback: (event, pageNo, data) => {
                this.gentPage2(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    }

    private gentPage3(current) {
        const config = {
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
            callback: (event, pageNo, data) => {
                this.gentPage3(pageNo);
                console.log(data.id);
            }
        };
        new huPagination(config);
    }

    private copy() {
        const clipboard = new Clipboard('.icon');
        $('li').find('i').each(function () {
                $(this).attr('data-clipboard-text', this.outerHTML)
            }
        );
        clipboard.on('success', (e) => {
                $('.prompt-success').show(200, () => {
                        setTimeout(() => {
                                $('.prompt-success').hide(200)
                            }
                            ,
                            500
                        )
                    }
                );
            }
        );
    }

    private setFormTest() {
        const defaultData = {
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
        };

        $('#setvalue').on('click', () => {
            huForm.setFormData($('#form'), defaultData);
        });

        $('#getvalue').on('click', () => {
            const formData = huForm.getFormData($('#form'));
            console.log(formData);
            console.log(JSON.stringify(formData));
            console.log(JSON.stringify(defaultData));
            console.log(_.isEqual(formData, defaultData));
            alert(JSON.stringify(formData));
        });
    }

    private highlight($item: JQuery, html = '', js = '', css = '') {
        let tabId1 = huUtils.randomId('code-tab');
        let tabId2 = huUtils.randomId('code-tab');
        let tabId3 = huUtils.randomId('code-tab');
        let tabHTML = `<div class="code-demo">
                <ul class="hu-tabs tabs-primary">
                    <li class="active"><a href="#${tabId1}">Demo</a></li>
                    <li class=""><a href="#${tabId2}">HTML</a></li>
                    <li class=""><a href="#${tabId3}">JAVASCRIPT</a></li>
                </ul>
                <div class="hu-tab-content">
                    <div class="tab-pane active" id="${tabId1}">
                        ${html}
                    </div>
                    <div class="tab-pane" id="${tabId2}">
                        <pre><code class="html"></code></pre>
                    </div>
                    <div class="tab-pane" id="${tabId3}">
                        <pre><code class="javascript">${js}</code></pre>
                    </div>
                </div>
            </div>`;
        const $new = $(tabHTML);
        $new.find('code.html').text(html);
        $item.replaceWith($new);
        hljs.highlightBlock($new.find('code.html')[0]);
        hljs.highlightBlock($new.find('code.javascript')[0]);
    }
}

$(() => {
    new test();
});
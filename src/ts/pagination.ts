interface huPaginationConfig {
    callback: Function;
    cls?: string,
    current: number;
    data?: any;
    jumpEnable?: boolean;
    pageSize?: number;
    prevNextEnable?: boolean;
    prevNextMultiEnable?: boolean;
    selector: string | HTMLElement | JQuery;
    showNum?: number;
    startEndEnable?: boolean;
    total?: number;
    totalItem?: number;
    totalItemShow?: boolean;
}

class huPagination {
    $container: JQuery;
    attrName = '';
    cls = '';
    clsName = '';
    config: huPaginationConfig;
    defaultConfig: huPaginationConfig = {
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
    namespace: string = '';

    constructor(config: huPaginationConfig) {
        this.config = $.extend(true, {}, this.defaultConfig, config);
        if (!this.config.total) {
            if (!this.config.totalItem || !this.config.pageSize) {
                huUtils.error('total或totalItem与pageSize不能同时为空');
            } else {
                this.config.total = Math.ceil(this.config.totalItem / this.config.pageSize);
            }
        }
        if (!this.config.selector) {
            huUtils.error('selector不能为空');
        } else {
            this.namespace = huConfig.namespace;
            this.clsName = this.namespace + 'pagination';
            this.attrName = this.namespace + 'page';
            this.cls = '.' + this.clsName;
            this.$container = $(this.config.selector);
            if (this.$container.is('ul')) {
                if (!this.$container.hasClass(this.clsName)) {
                    this.$container.addClass(this.clsName)
                }
            } else {
                let container = `<ul class="${this.clsName}"></ul>`;
                this.$container.html(container);
                this.$container = this.$container.find(this.cls);
            }
            this.$container.addClass(this.config.cls);
            this.init();
        }
    }

    private init() {
        this.buildHTML();
        this.bindEvent();
    }

    private buildHTML() {
        const total = this.config.total;
        const cur = Math.floor(this.config.current);
        let html = '';
        if (total == 0) {
            html = '';
        } else if (total < cur) {
            html = '';
            huUtils.error('当前页数不能大于总页数');
        } else {
            const all = this.config.showNum;
            const half = (this.config.showNum - 1) / 2;
            let first = 1;
            let last = total;
            const prevNextEnable = this.config.prevNextEnable;
            const prevNextMultiEnable = this.config.prevNextMultiEnable;
            const startEndEnable = this.config.startEndEnable;
            const jumpEnable = this.config.jumpEnable;
            const totalItemShow = this.config.totalItemShow;
            if (last > all) {
                if (cur - half > 1) {
                    first = Math.ceil(cur - half);
                }
                if (last - cur < half) {
                    first = last - all + 1;
                } else {
                    last = first + all - 1;
                }
            }
            let firstEnable = cur != 1;
            let firstEnableCls = firstEnable ? '' : 'disabled';
            let lastEnable = cur != total;
            let lastEnableCls = lastEnable ? '' : 'disabled';
            totalItemShow && (html += `<li class="page-total">共计${this.config.totalItem}个</li>`);
            startEndEnable && (html += `<li class="page-item page-first ${firstEnableCls}" ${this.attrName}="1" title="首页"></li>`);
            prevNextMultiEnable && (html += `<li class="page-item page-prev-multi ${firstEnableCls}" ${this.attrName}="${(cur - all) < 1 ? 1 : (cur - all)}" title="往前翻${all}页"></li>`);
            prevNextEnable && (html += `<li class="page-item page-prev ${firstEnableCls}" ${this.attrName}="${(cur - 1) < 1 ? 1 : (cur - 1)}" title="上一页"></li>`);
            for (let i = first; i <= last; i++) {
                html += `<li class="page-item ${i == cur ? 'active' : ''}" ${this.attrName}="${i}">${i}</li>`;
            }
            prevNextEnable && (html += `<li class="page-item page-next ${lastEnableCls}" ${this.attrName}="${(cur + 1) > total ? total : (cur + 1)}" title="下一页"></li>`);
            prevNextMultiEnable && (html += `<li class="page-item page-next-multi ${lastEnableCls}" ${this.attrName}="${(cur + all) > total ? total : (cur + all)}" title="往后翻${all}页"></li>`);
            startEndEnable && (html += `<li class="page-item page-last ${lastEnableCls}" ${this.attrName}="${total}" title="末页"></li>`);
            jumpEnable && (html += `<li class="page-jump"><span>跳转到</span><input type="number" min="1" max="${total}" step="1" class="${this.namespace}input" value="${cur}"><span>页</span></li>`);
        }
        this.$container.html(html);
    }

    private bindEvent() {
        this.$container.off();

        this.$container.on('click', 'li:not(.disabled)[' + this.attrName + ']', {eventData: this.config.data}, (event) => {
            const eventData = event.data.eventData;
            const pageNo = $(event.currentTarget).attr(this.attrName);
            this.config.callback(event, pageNo, eventData);
        });
        this.$container.on('click', 'li.page-jump button', {eventData: this.config.data}, (event) => {
            const eventData = event.data.eventData;
            const pageNo = <number>$(event.currentTarget).prev('input').val();
            this.goTo(event, pageNo, eventData);
        });
        this.$container.on('keyup', 'li.page-jump input', {eventData: this.config.data}, (event) => {
            const pageNo = $(event.currentTarget).val();
            const re = /^[0-9]*$/;
            if (pageNo == '') {

            } else if (!re.test(pageNo + '')) {
                const old = $(event.currentTarget).data('data');
                $(event.currentTarget).val(old);
            } else if (pageNo > this.config.total) {
                $(event.currentTarget).val(this.config.total);
            } else if (pageNo < 1) {
                $(event.currentTarget).val(1);
            }
        });
        this.$container.on('keydown', 'li.page-jump input', {eventData: this.config.data}, (event) => {
            const code = event.keyCode || event.which || event.charCode;
            const pageNo = <number>$(event.currentTarget).val();
            if (code == 13) {
                const eventData = event.data.eventData;
                this.goTo(event, pageNo, eventData);
            } else {
                $(event.currentTarget).data('data', pageNo);
            }
        });
    }

    private goTo(event: any, pageNo: number, eventData: any) {
        if (pageNo <= this.config.total && pageNo > 0) {
            this.config.callback(event, pageNo, eventData);
        } else {
            huUtils.error('跳转页不存在');
        }
    }

}
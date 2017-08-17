interface huPaginationConfig {
    callback: Function;
    current: number;
    data?: any;
    // jumpEnable?: boolean;
    prevNextEnable?: boolean;
    prevNextMultiEnable?: boolean;
    selector: string | HTMLElement | JQuery;
    showNum?: number;
    startEndEnable?: boolean;
    total: number;
}

class huPagination {
    $container: JQuery;
    attrName = '';
    cls = '';
    clsName = '';
    config: huPaginationConfig;
    defaultConfig: huPaginationConfig = {
        callback: $.noop,
        current: 1,
        // jumpEnable: false,
        prevNextEnable: false,
        prevNextMultiEnable: false,
        selector: '',
        showNum: 9,
        startEndEnable: true,
        total: 0,
    };
    namespace: string = '';

    constructor(config: huPaginationConfig) {
        this.config = $.extend(true, {}, this.defaultConfig, config);
        if (!this.config.selector) {
            console.error('selector不能为空');
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
            this.init();
        }
    }

    private init() {
        this.buildHTML();
        this.bindEvent();
    }

    private buildHTML() {
        const total = this.config.total;
        const all = this.config.showNum;
        const half = (this.config.showNum - 1) / 2;
        let first = 1;
        let last = total;
        const center = Math.floor(this.config.current);
        const cur = center;
        const prevNextEnable = this.config.prevNextEnable;
        const prevNextMultiEnable = this.config.prevNextMultiEnable;
        const startEndEnable = this.config.startEndEnable;
        if (last > all) {
            if (center - half > 1) {
                first = Math.ceil(center - half);
            }
            if (last - center < half) {
                first = last - all + 1;
            } else {
                last = first + all - 1;
            }
        }
        let html = '';
        if (this.config.total == 0) {
            html = '';
        } else {
            let firstEnable = cur != 1;
            let firstEnableCls = firstEnable ? '' : 'disabled';
            let lastEnable = cur != total;
            let lastEnableCls = lastEnable ? '' : 'disabled';
            startEndEnable && (html += `<li class="page-first ${firstEnableCls}" ${this.attrName}="1" title="首页"></li>`);
            prevNextMultiEnable && (html += `<li class="page-prev-multi ${firstEnableCls}" ${this.attrName}="${(cur - all) < 1 ? 1 : (cur - all)}" title="往前翻${all}页"></li>`);
            prevNextEnable && (html += `<li class="page-prev ${firstEnableCls}" ${this.attrName}="${(cur - 1) < 1 ? 1 : (cur - 1)}" title="上一页"></li>`);
            for (let i = first; i <= last; i++) {
                html += `<li class="${i == cur ? 'active' : ''}" ${this.attrName}="${i}">${i}</li>`;
            }
            prevNextEnable && (html += `<li class="page-next ${lastEnableCls}" ${this.attrName}="${(cur + 1) > total ? total : (cur + 1)}" title="下一页"></li>`);
            prevNextMultiEnable && (html += `<li class="page-next-multi ${lastEnableCls}" ${this.attrName}="${(cur + all) > total ? total : (cur + all)}" title="往后翻${all}页"></li>`);
            startEndEnable && (html += `<li class="page-last ${lastEnableCls}" ${this.attrName}="${total}" title="末页"></li>`);
        }
        this.$container.html(html);
    }

    private bindEvent() {
        this.$container.on('click', 'li:not(.disabled)', {eventData: this.config.data}, (event) => {
            const eventData = event.data.eventData;
            const pageNo = $(event.currentTarget).attr(this.attrName);
            this.config.callback(event, pageNo, eventData);
        });
    }


}
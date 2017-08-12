class huBackTop {
    items: JQuery;
    attrName = '';
    namespace: string = '';

    constructor(selector: string) {
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-pos';
        this.items = $(selector);
        this.init();
    }

    private init() {
        $(window).scroll((event) => {
            const height = document.body.scrollTop || document.documentElement.scrollTop;
            this.items.toggleClass('on', height > 500);
        });
        this.items.each((i: number, v: Element) => {
            const pos = $(v).attr(this.attrName) || 0;
            $(v).on('click', (event) => {
                $("html,body").animate({scrollTop: pos}, 300);
            });
        });
    }
}
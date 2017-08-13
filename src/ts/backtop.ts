class huBackTop {
    attrName = '';
    cls = '';
    clsName = '';
    namespace: string = '';

    constructor() {
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-pos';
        this.clsName = this.namespace + 'backtop';
        this.cls = '.' + this.clsName;
        this.init();
    }

    private init() {
        $(window).scroll((event) => {
            const height = document.body.scrollTop || document.documentElement.scrollTop;
            $(this.cls).toggleClass('on', height > 500);
        });
        $('body').on('click', this.cls, (event) => {
            const pos = $(event.currentTarget).attr(this.attrName) || 0;
            $("html,body").animate({scrollTop: pos}, 300);
        });
    }
}
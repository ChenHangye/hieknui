class huDropdown {
    attrName = '';
    cls = '';
    clsName = '';
    itemsCls = '';
    namespace: string = '';
    valueName = '';

    constructor() {
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'dropdown';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'dropdown-items';
        this.init();
    }

    private init() {
        $('body').on('click', this.cls + '>span', (event) => {
            const $item = $(event.currentTarget);
            let id = $item.attr(this.attrName);
            if(!id){
                id = this.namespace + huUtils.randomId();
                $item.attr(this.attrName,id);
                $item.siblings(this.itemsCls).attr(this.attrName, id).appendTo('body');
            }
            const offset = $item.offset();
            const left = offset.left;
            const top = offset.top + $item.outerHeight() + 4;
            $(this.itemsCls + '[' + this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('on');
        }).on('click', this.itemsCls + '>li', (event) => {
            const $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
        }).on('click', (event) => {
            if (!$(event.target).closest(this.cls).length) {
                $('.on' + this.itemsCls).removeClass('on');
            }
        });
    }
}
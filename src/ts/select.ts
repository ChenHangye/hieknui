class huSelect {
    attrName = '';
    cls = '';
    clsName = '';
    itemsCls = '';
    namespace: string = '';
    valueName = '';

    constructor() {
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'select';
        this.cls = '.' + this.clsName;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemsCls = '.' + this.namespace + 'select-dropdown';
        this.init();
    }

    private init() {
        $('body').on('click', this.cls + ':not(.disabled)>span', (event) => {
            const $item = $(event.currentTarget);
            let id = $item.attr(this.attrName);
            if (!id) {
                id = this.namespace + huUtils.randomId();
                $item.attr(this.attrName, id);
                const $container = $item.closest(this.cls);
                let cls = 'inactive ';
                if ($container.hasClass('select-xs')) {
                    cls += 'select-xs';
                } else if ($container.hasClass('select-sm')) {
                    cls += 'select-sm';
                } else if ($container.hasClass('select-md')) {
                    cls += 'select-md';
                } else if ($container.hasClass('select-lg')) {
                    cls += 'select-lg';
                }
                $item.siblings(this.itemsCls).attr(this.attrName, id).attr('data-role', 'select').addClass(cls).appendTo('body');
            }
            const offset = $item.offset();
            const left = offset.left;
            const top = offset.top + $item.outerHeight() + 4;
            $(this.itemsCls + '[' + this.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('active inactive');
        }).on('click', this.itemsCls + '>li:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
            const id = $item.parent().attr(this.attrName);
            const value = $item.attr(this.valueName);
            const text = $item.text();
            $(this.cls + ' span[' + this.attrName + '="' + id + '"]').text(text).attr(this.valueName, value);
        }).on('click', (event) => {
            if (!$(event.target).closest(this.cls).length) {
                $('.on[data-role="select"]' + this.itemsCls).removeClass('active').addClass('inactive');
            }
        });
    }
}
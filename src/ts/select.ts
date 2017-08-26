class huSelect {
    static namespace: string = huConfig.namespace;
    static clsName = huSelect.namespace + 'select';
    static cls = '.' + huSelect.clsName;
    static attrName = huSelect.namespace + 'data-id';
    static itemsCls = '.' + huSelect.namespace + 'select-dropdown';
    static valueName = huSelect.namespace + 'data-value';

    constructor() {
        huSelect.init();
    }

    private static init() {
        $('body').on('click', huSelect.cls + ':not(.disabled)>span', (event) => {
            const $item = $(event.currentTarget);
            let id = $item.attr(huSelect.attrName);
            if (!id) {
                id = huSelect.namespace + huUtils.randomId();
                $item.attr(huSelect.attrName, id);
                const $container = $item.closest(huSelect.cls);
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
                $item.siblings(huSelect.itemsCls).attr(huSelect.attrName, id).attr('data-role', 'select').addClass(cls).appendTo('body');
            }
            const offset = $item.offset();
            const left = offset.left;
            const top = offset.top + $item.outerHeight() + 4;
            $(huSelect.itemsCls + '[' + huSelect.attrName + '="' + id + '"]').css({
                top: top,
                left: left,
                width: $item.outerWidth()
            }).toggleClass('active inactive');
        }).on('click', huSelect.itemsCls + '>li:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            $item.addClass('active').siblings('.active').removeClass('active');
            const id = $item.parent().attr(huSelect.attrName);
            const value = $item.attr(huSelect.valueName);
            const text = $item.text();
            $(huSelect.cls + ' span[' + huSelect.attrName + '="' + id + '"]').text(text).attr(huSelect.valueName, value);
        }).on('click', (event) => {
            if (!$(event.target).closest(huSelect.cls).length) {
                $('.active[data-role="select"]' + huSelect.itemsCls).removeClass('active').addClass('inactive');
            }
        });
    }

    static get($item: JQuery) {
        const $shower = $item.children('span');
        return $shower.attr(huSelect.valueName);
    }

    static set($item: JQuery, value: any) {
        const $shower = $item.children('span');
        const id = $shower.attr(huSelect.attrName);
        let $options = $item.children(huSelect.itemsCls);
        if (id) {
            $options = $(huSelect.itemsCls + '[' + huSelect.attrName + '="' + id + '"]');
        }
        const $option = $options.children('[' + huSelect.valueName + '="' + value + '"]');
        if($option.length){
            const text = $option.text();
            $option.addClass('active').siblings('.active').removeClass('active');
            $shower.text(text).attr(huSelect.valueName, value);
        }else{
            $shower.text('').attr(huSelect.valueName, '');
        }
    }
}
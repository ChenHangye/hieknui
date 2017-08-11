class huDropdown {
    attrName = '';
    valueName = '';
    items: JQuery;
    itemName = '';
    itemsName = '';
    namespace: string = '';

    constructor(selector: string) {
        this.namespace = config.namespace;
        this.attrName = this.namespace + 'data-id';
        this.valueName = this.namespace + 'data-value';
        this.itemName = this.namespace + 'dropdown';
        this.itemsName = this.namespace + 'dropdown-items';
        this.items = $(selector);
        this.init();
    }

    private init() {
        this.items.each((i: number, v: Element) => {
            if (!$(v).attr(this.attrName)) {
                const id = this.namespace + huUtils.randomId();
                $(v).attr(this.attrName, id);
                $(v).children('ul').attr(this.attrName, id);
                $(v).find('.' + this.itemsName).on('click', 'li', (event) => {
                    const $item = $(event.currentTarget);
                    const id = $item.parent().attr(this.attrName);
                    const v = $item.attr(this.valueName);
                    const value = v === undefined ? $item.text() : v;
                    $('.' + this.itemName + '[' + this.attrName + '="' + id + '"] span').text(value);
                }).appendTo($('body'));
                $(v).on('click', '>span', (event) => {
                    const offset = $(event.currentTarget).offset();
                    const left = offset.left;
                    const top = offset.top + $(event.currentTarget).outerHeight() + 4;
                    const id = $(event.currentTarget).parent().attr(this.attrName);
                    $('.' + this.itemsName + '[' + this.attrName + '="' + id + '"]').css({
                        top: top,
                        left: left
                    }).toggleClass('on');
                });
            }
        });
        $('body').on('click', (event) => {
            if (!$(event.target).closest('.' + this.itemName).length) {
                $('.on.' + this.itemsName).removeClass('on');
            }
        });
    }
}
class huTabs {
    static cls = '';
    static clsName = '';
    static namespace: string = '';
    static navContainerClsName = '';
    static wrapClsName = '';

    constructor() {
        huTabs.namespace = huConfig.namespace;
        huTabs.clsName = huTabs.namespace + 'tabs';
        huTabs.navContainerClsName = huTabs.clsName + '-nav-container';
        huTabs.wrapClsName = huTabs.clsName + '-wrap';
        huTabs.cls = '.' + huTabs.clsName;
        huTabs.init();
    }

    private static bindEvent() {
        $('body').on('click', huTabs.cls + '>li:not(.disabled)', (event) => {
            let $tab = $(event.currentTarget);
            const selector = $tab.find('a').attr('href');
            $tab = $('a[href="'+selector+'"]').closest('li');
            const $page = $(selector);
            const $pageOld = $page.siblings('.active');
            const selectorOld = '#' + $pageOld.attr('id');
            const $tabOld = $('a[href="'+selectorOld+'"]').closest('li');
            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');
            $tab.each((i,v)=>{
                huTabs.resize($(v).closest(huTabs.cls));
            });
        }).on('click', '.tabs-prev-control:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            const $wrap = $item.siblings('.' + huTabs.wrapClsName);
            const $ul = $wrap.children('ul');
            let f = 'outerWidth';
            let cssAttr = 'margin-left';
            if (huTabs.isVertical($item)) {
                f = 'outerHeight';
                cssAttr = 'margin-top';
            }
            const pos = parseInt($ul.css(cssAttr));
            const wSize = $wrap[f]();
            const newPos = pos + wSize;
            const tarPos = newPos < 0 ? newPos : 0;
            $ul.css(cssAttr, tarPos);
            huTabs.resetClickable($ul, tarPos !== 0, true);
        }).on('click', '.tabs-next-control:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            const $wrap = $item.siblings('.' + huTabs.wrapClsName);
            const $ul = $wrap.children('ul');
            let f = 'outerWidth';
            let cssAttr = 'margin-left';
            if (huTabs.isVertical($item)) {
                f = 'outerHeight';
                cssAttr = 'margin-top';
            }
            const pos = parseInt($ul.css(cssAttr));
            const wSize = $wrap[f]();
            const uSize = $ul[f]() - wSize;
            const newPos = pos - wSize;
            const tarPos = newPos > -uSize ? newPos : -uSize;
            $ul.css(cssAttr, tarPos);
            huTabs.resetClickable($ul, true, tarPos !== -uSize);
        });

        $(window).resize((event) => {
            huTabs.resizeAll();
        });
    }

    private static calcEnable($item: JQuery, pPos?: number) {
        const $wrap = $item.parent();
        let f = 'width';
        let cssAttr = 'margin-left';
        if (huTabs.isVertical($item)) {
            f = 'height';
            cssAttr = 'margin-top';
        }
        pPos = typeof pPos == 'undefined' ? parseInt($item.css(cssAttr)) : pPos;
        return {prev: pPos < 0, next: $wrap[f]() - pPos < $item[f]()}
    }

    private static init() {
        huTabs.bindEvent();
        huTabs.resizeAll();
    }

    private static isVertical($item: JQuery) {
        return $item.closest('.' + huTabs.navContainerClsName).parent('.tabs-left,.tabs-right').length;
    }

    private static resetAllClickable() {
        $(huTabs.cls).each((i, v) => {
            huTabs.resetClickable($(v));
        });
    }

    private static resetClickable($item: JQuery, prevEnable?: boolean, nextEnable?: boolean) {
        if (typeof prevEnable == 'undefined' || typeof nextEnable == 'undefined') {
            const status = huTabs.calcEnable($item);
            prevEnable = status.prev;
            nextEnable = status.next;
        }
        const $wrap = $item.parent();
        $wrap.siblings('.tabs-prev-control').toggleClass('disabled', !prevEnable);
        $wrap.siblings('.tabs-next-control').toggleClass('disabled', !nextEnable);
    }

    private static resizeAll() {
        huTabs.wrapAll();
        $(huTabs.cls).each((i, v) => {
            huTabs.resize($(v));
        });
    }

    private static resize($item: JQuery) {
        let f = 'width';
        let of = 'outerWidth';
        let type = 'left';
        let cssAttr = 'margin-' + type;
        if (huTabs.isVertical($item)) {
            f = 'height';
            of = 'outerHeight';
            type = 'top';
            cssAttr = 'margin-' + type;
        }
        let lis = 0;
        $item.children('li').each((j, li) => {
            lis += $(li)[of]();
        });
        const $navContainer = $item.closest('.' + huTabs.navContainerClsName);
        const l = $navContainer[f]();
        $navContainer.toggleClass('show-all', l >= lis);
        if (l < lis) {
            $item[f](lis);
            const $active = $item.children('li.active');
            const pos = $active.position()[type];
            let pPos = parseInt($item.css(cssAttr));
            if (pos + pPos < 0) {
                pPos = -pos;
            } else if ((pos + $active[of]() + pPos) > l) {
                pPos = l - $active[of]() - pos;
            }
            const pSize = $item[f]();
            if (l > (pSize + pPos) && pPos < 0) {
                pPos = l - pSize;
            }
            $item.css(cssAttr, pPos);
            const status = huTabs.calcEnable($item, pPos);
            huTabs.resetClickable($item, status.prev, status.next);
        }
    }

    private static wrapAll() {
        $(huTabs.cls).each((i, v) => {
            huTabs.wrap($(v));
        });
    }

    private static wrap($item: JQuery) {
        if (!$item.parent('.' + huTabs.wrapClsName).length) {
            const wrap = '<div class="' + huTabs.wrapClsName + '"></div>';
            const container = '<div class="' + huTabs.navContainerClsName + '"></div>';
            const controls = '<div class="tabs-control tabs-prev-control"></div><div class="tabs-control tabs-next-control"></div>';
            $item.wrap(container).after(controls).wrap(wrap);
        }
    }
}

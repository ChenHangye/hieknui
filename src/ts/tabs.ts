class huTabs {
    static cls = '';
    static clsName = '';
    static namespace: string = '';

    constructor() {
        huTabs.namespace = huConfig.namespace;
        huTabs.clsName = huTabs.namespace + 'tabs';
        huTabs.cls = '.' + huTabs.clsName;
        huTabs.init();
    }

    private static bindEvent() {
        const xPath = '>.tabs-nav-container:not(.show-all)>.tabs-wrap';

        $('body').on('click', huTabs.cls + '>li:not(.disabled)', (event) => {
            let $tab = $(event.currentTarget);
            const selector = $tab.find('a').attr('href');
            $tab = $('a[href="' + selector + '"]').closest('li');
            const $page = $(selector);
            const $pageOld = $page.siblings('.active');
            const selectorOld = '#' + $pageOld.attr('id');
            const $tabOld = $('a[href="' + selectorOld + '"]').closest('li');
            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');
            $tab.each((i, v) => {
                const $item = $(v);
                huTabs.resize($item.closest(huTabs.cls));
                huTabs.resetDecorationPos($item);
            });
            $tabOld.each((i, v) => {
                const $item = $(v);
                if (!$item.siblings('.active').length) {
                    huTabs.resetDecorationPos($item);
                }
            });
        }).on('click', '.tabs-prev-control:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            const $wrap = $item.siblings('.tabs-wrap');
            const isVertical = huTabs.isVertical($item);
            let f = 'outerWidth';
            if (isVertical) {
                f = 'outerHeight';
            }
            const wSize = $wrap[f]();
            huTabs.resetPos($wrap, wSize, isVertical);
        }).on('click', '.tabs-next-control:not(.disabled)', (event) => {
            const $item = $(event.currentTarget);
            const $wrap = $item.siblings('.tabs-wrap');
            const isVertical = huTabs.isVertical($item);
            let f = 'outerWidth';
            if (isVertical) {
                f = 'outerHeight';
            }
            const wSize = $wrap[f]();
            huTabs.resetPos($wrap, -wSize, isVertical);
        }).on('mousewheel', '.tabs-left' + xPath + ',.tabs-right' + xPath, function (event: any) {
            const $wrap = $(event.currentTarget);
            huTabs.resetPos($wrap, event.deltaY * event.deltaFactor, true);
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
        return $item.closest('.tabs-nav-container').parent('.tabs-left,.tabs-right').length > 0;
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

    private static resetDecorationPos($item: JQuery) {
        const isVertical = huTabs.isVertical($item);
        let fun = 'width';
        let sizeFun = 'outerWidth';
        let posChangeAtt = 'left';
        if (isVertical) {
            fun = 'height';
            sizeFun = 'outerHeight';
            posChangeAtt = 'top';
        }
        const $decoration = $item.siblings('.tabs-decoration');
        if ($item.hasClass('active')) {
            let size = $item[sizeFun]();
            $decoration[fun](size);
            let posChange = $item.position()[posChangeAtt];
            $decoration.css(posChangeAtt, posChange);
        } else {
            let size = $decoration[sizeFun]();
            $decoration[fun](0);
            let posChange = $decoration.position()[posChangeAtt];
            $decoration.css(posChangeAtt, posChange + size / 2);
        }
    }

    private static resetPos($wrap: JQuery, deltaPos: number, isVertical: boolean) {
        const $ul = $wrap.children('ul');
        let f = 'outerWidth';
        let cssAttr = 'margin-left';
        if (isVertical) {
            f = 'outerHeight';
            cssAttr = 'margin-top';
        }
        const wSize = $wrap[f]();
        const uSize = $ul[f]() - wSize;
        const pos = parseInt($ul.css(cssAttr));
        const newPos = pos + deltaPos;
        let tarPos = newPos > -uSize ? newPos : -uSize;
        tarPos = tarPos < 0 ? tarPos : 0;
        $ul.css(cssAttr, tarPos);
        huTabs.resetClickable($ul, tarPos !== 0, tarPos !== -uSize);
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
        $item.children('li:not(.tabs-decoration)').each((j, li) => {
            lis += $(li)[of]();
        });
        const $navContainer = $item.closest('.tabs-nav-container');
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
        if (!$item.parent('.tabs-wrap').length) {
            const wrap = '<div class="tabs-wrap"></div>';
            const container = '<div class="tabs-nav-container"></div>';
            const $decoration = $('<li class="tabs-decoration"></li>');
            const controls = '<div class="tabs-control tabs-prev-control"></div><div class="tabs-control tabs-next-control"></div>';
            $item.wrap(container).after(controls).wrap(wrap);
            $item.append($decoration);
            huTabs.resetDecorationPos($item.children('li.active'));
        }
    }
}

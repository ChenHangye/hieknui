class tabs {
    namespace: string = '';
    $container: JQuery;

    constructor(selector: string) {
        this.namespace = config.namespace;
        this.$container = $(selector);
        this.init();
    }

    private bindEvent() {
        this.$container.children('li').on('click', (event) => {
            const $tab = $(event.currentTarget);
            const $tabOld = $tab.siblings('.active');
            const selector = $tab.find('a').attr('href');
            const selectorOld = $tabOld.find('a').attr('href');
            const $page = $(selector);
            const $pageOld = $(selectorOld);
            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');
        });
    }

    private init() {
        this.bindEvent();
    }

    private select(selector: string): JQuery {
        return this.$container.find(selector);
    }
}
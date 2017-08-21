class huTabs {
    cls = '';
    clsName = '';
    namespace: string = '';

    constructor() {
        this.namespace = huConfig.namespace;
        this.clsName = this.namespace + 'tabs';
        this.cls = '.' + this.clsName;
        this.init();
    }

    private init() {
        $('body').on('click', this.cls + '>li:not(.disabled)', (event) => {
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
}
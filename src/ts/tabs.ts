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
            const newIdx = $tab.index();
            const oldIdx = $tabOld.index();
            const selector = $tab.find('a').attr('href');
            const selectorOld = $tabOld.find('a').attr('href');
            const $page = $(selector);
            const $pageOld = $(selectorOld);

            // $tab.removeClass('front-in front-out back-in back-out');
            // $page.removeClass('front-in front-out back-in back-out');
            // $tabOld.removeClass('front-in front-out back-in back-out');
            // $pageOld.removeClass('front-in front-out back-in back-out');

            $tab.addClass('active');
            $page.addClass('active');
            $tabOld.removeClass('active');
            $pageOld.removeClass('active');

            // if(newIdx > oldIdx){
            //     $tab.addClass('back-in');
            //     $page.addClass('back-in');
            //     $tabOld.addClass('front-out');
            //     $pageOld.addClass('front-out');
            // }else{
            //     $tab.addClass('front-in');
            //     $page.addClass('front-in');
            //     $tabOld.addClass('back-out');
            //     $pageOld.addClass('back-out');
            // }
        });
    }
}
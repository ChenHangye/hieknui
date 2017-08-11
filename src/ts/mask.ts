class huMask {
    namespace: string = '';
    cls = '';
    item: JQuery;

    constructor(cls = '') {
        this.namespace = config.namespace;
        this.cls = cls;
        this.init();
    }

    private init() {
        this.item = $('<div class="' + this.namespace + 'mask ' + this.cls + '"></div>');
        $('body').append(this.item);
    }
}
class huTag {
    cls = '';
    clsName = '';
    namespace: string = '';

    constructor() {
        this.namespace = config.namespace;
        this.clsName = this.namespace + 'tag';
        this.cls = '.' + this.clsName;
        this.init();
    }

    private init() {
        $('body').on('click', this.cls + ' .close', (event) => {
            $(event.currentTarget).closest(this.cls).remove();
        });
    }
}
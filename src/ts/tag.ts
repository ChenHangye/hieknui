class huTag {
    items: JQuery;
    namespace: string = '';

    constructor(selector: string) {
        this.namespace = config.namespace;
        this.items = $(selector);
        this.init();
    }

    private init() {
        this.items.each((i: number, v: Element) => {
            $(v).find('i.close').on('click',(event)=>{
                $(event.currentTarget).closest('.tag-action').remove();
            });
        });
    }
}
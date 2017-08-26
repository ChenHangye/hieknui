interface formSetConfig {
    attr?: string;
    clearNull?: boolean;
}

interface formGetConfig {
    attr?: string;
}

class huForm {
    static namespace: string = huConfig.namespace;
    static attrArray: string = huForm.namespace + 'data-type';
    static attrAfterGet: string = huForm.namespace + 'data-afterget';
    static attrBeforeUpdate: string = huForm.namespace + 'data-beforeupdate';
    static attrContainer: string = huForm.namespace + 'data-container';
    static attrGet: string = huForm.namespace + 'data-get';
    static attrItem: string = huForm.namespace + 'data-item';
    static attrModel: string = huForm.namespace + 'data-model';
    static attrSet: string = huForm.namespace + 'data-set';
    static attrSwitch: string = huForm.namespace + 'data-switch';
    static setConfig: formSetConfig = {
        attr: 'name',
        clearNull: true
    };
    static getConfig: formGetConfig = {
        attr: 'name'
    };

    static isArrayItem($item: JQuery): boolean {
        return $item.attr(huForm.attrArray) == 'array';
    }

    static setFormData($form: JQuery, data: any, settings: formSetConfig = {}) {
        let config = huForm.setConfig;
        $.extend(true, config, settings);
        const attr = config.attr;
        const selector = 'fieldset[' + attr + '],.' + huForm.namespace + 'fieldset[' + attr + ']';
        huForm.setFormDataObj($form, data, config);
        const fieldsets = $form.find(selector);
        $.each(fieldsets, function (i, v) {
            const $item = $(v);
            const name = $item.attr(<string>attr);
            if (name) {
                const $container = $item.parent().closest(selector);
                if (!$container.length || $container.attr(attr) == $form.attr(attr)) {
                    if (huForm.isArrayItem($item)) {
                        const $parent = $item.parent();
                        const $model = $parent.children('[' + huForm.attrModel + ']');
                        if($model.length){
                            $parent.children('[' + attr + '="' + name + '"]:not([' + huForm.attrModel + '])').remove();
                        }else{
                            $parent.children('[' + attr + '="' + name + '"]:gt(0)').remove();
                        }
                        for (const idx in data[name]) {
                            if (data[name].hasOwnProperty(idx)) {
                                let $obj = $item;
                                if (idx != '0' || $model.length) {
                                    $obj = $obj.clone();
                                    if($model.length){
                                        $obj.removeAttr(huForm.attrModel);
                                    }
                                    $obj.appendTo($parent);
                                }
                                huForm.setFormData($obj, data[name][idx], config);
                            }
                        }
                    } else {
                        huForm.setFormData($item, data[name], config);
                    }
                }
            }
        });
    }

    static setFormDataObj($form: JQuery, data: any, settings: formSetConfig = {}) {
        let config = huForm.setConfig;
        $.extend(true, config, settings);
        const attr = config.attr;
        const selector = 'fieldset[' + attr + '],.' + huForm.namespace + 'fieldset[' + attr + ']';
        const $inputs = $form.find('input[' + attr + '][type=checkbox],input[' + attr + '][type=radio]');
        $inputs.prop('checked', false);
        const $items = $form.find('[' + attr + ']');
        $.each($items, function (i, v) {
            const $item = $(v);
            if (!$item.is(selector)) {
                huForm.updateFormData($item, huForm.getFormItemData($item, data, config), config);
            }
        });
    }

    static getFormItemData($form: JQuery, data: any, settings: formSetConfig = {}) {
        let config = huForm.setConfig;
        $.extend(true, config, settings);
        const attr = config.attr;

        let d = '';
        const name = $form.attr(attr);
        if (name) {
            d = data[name];
        }
        return d;
    }

    static updateFormData($form: JQuery, data: any, settings: formSetConfig = {}) {
        let config = huForm.setConfig;
        $.extend(true, config, settings);
        const attr = config.attr;
        if ($form.is('input[type="checkbox"]')) {
            if (Array.isArray(data)) {
                $form.prop('checked', false);
                for (const v of data) {
                    if(v == $form.val()){
                        huForm.updateItemValue($form, true, config);
                    }
                }
            } else {
                huForm.updateItemValue($form, data === true || data == $form.val(), config);
            }
        } else if ($form.is('input[type="radio"]')) {
            huForm.updateItemValue($form, data == $form.val(), config);
        } else {
            if (Array.isArray(data)) {
                const $parent = $form.parent();
                const name = $form.attr(attr);
                const $model = $parent.children('[' + huForm.attrModel + ']');
                if($model.length){
                    $parent.children('[' + attr + '="' + name + '"]:not([' + huForm.attrModel + '])').remove();
                }else{
                    $parent.children('[' + attr + '="' + name + '"]:gt(0)').remove();
                }
                for (const idx in data) {
                    if (data.hasOwnProperty(idx)) {
                        let $obj = $form;
                        if (idx != '0' || $model.length) {
                            $obj = $obj.clone();
                            if($model.length){
                                $obj.removeAttr(huForm.attrModel);
                            }
                            $obj.appendTo($parent);
                        }
                        huForm.updateItemValue($obj, data[idx], config);
                    }
                }
            } else {
                huForm.updateItemValue($form, data, config);
            }
        }
    }

    static updateItemValue($form: JQuery, data: any, settings: formSetConfig = {}) {
        let config = huForm.setConfig;
        $.extend(true, config, settings);
        data = config.clearNull ? huUtils.clearNullData(data) : data;
        const beforeupdate = $form.attr(huForm.attrBeforeUpdate);
        if (beforeupdate) {
            data = eval(beforeupdate)(data);
        }
        if ($form.is('IMG')) {
            $form.attr('src', data);
        } else if ($form.is('input[type="checkbox"],input[type="radio"]')) {
            $form.prop('checked', data);
        } else if ($form.is('input,select,textarea')) {
            $form.val(data);
        } else {
            if ($form.is('['+huForm.attrSet+']')) {
                eval($form.attr(huForm.attrSet))($form, data);
            } else if ($form.is('['+huForm.attrContainer+']')) {
                $form.find('['+huForm.attrItem+']').html(data);
            } else {
                $form.html(data);
            }
        }
    }

    static getFormData($form: JQuery, settings: formGetConfig = {}) {
        let config = huForm.getConfig;
        $.extend(true, config, settings);
        const attr = config.attr;
        const selector = 'fieldset[' + attr + '],.' + huForm.namespace + 'fieldset[' + attr + ']';
        const fieldsets = $form.find(selector);
        let mdata = {};
        $.each(fieldsets, function (i, v) {
            const $item = $(v);
            const name = $item.attr(<string>attr);
            if (name) {
                const $container = $item.parent().closest(selector);
                if (!$container.length || $container.attr(attr) == $form.attr(attr)) {
                    if (huForm.isArrayItem($item)) {
                        if (!mdata[name]) {
                            mdata[name] = [];
                        }
                        mdata[name].push(huForm.getFormData($item, config));
                    } else {
                        mdata[name] = huForm.getFormData($item, config);
                    }
                }
            }
        });
        $.extend(mdata, huForm.getFormDataObj($form, config));
        return mdata;
    }

    static getFormDataObj($form: JQuery, settings: formGetConfig = {}) {
        let config = huForm.getConfig;
        $.extend(true, config, settings);
        const attr = config.attr;
        const selector = 'fieldset[' + attr + '],.' + huForm.namespace + 'fieldset[' + attr + '],[' + huForm.attrModel + ']';
        let mdata = {};
        const inputs = $form.find('[' + attr + ']');
        $.each(inputs, function (i, v) {
            const $item = $(v);
            if (!$item.is(selector)) {
                const $container = $item.closest(selector);
                if (!$container.length || $container.attr(attr) == $form.attr(attr)) {
                    const n = $item.attr(attr);
                    if ($item.is('input[type="checkbox"]')) {
                        if ($item.is('['+huForm.attrSwitch+']')) {
                            mdata[n] = huForm.getItemValue($item, config);
                        } else {
                            if (!mdata[n]) {
                                mdata[n] = [];
                            }
                            if ((<HTMLInputElement>v).checked) {
                                mdata[n].push(huForm.getItemValue($item, config));
                            }
                        }
                    } else if ($item.is('input[type="radio"]') && !(<HTMLInputElement>v).checked) {
                        $.noop();
                    } else {
                        if (huForm.isArrayItem($item)) {
                            if (!mdata[n]) {
                                mdata[n] = [];
                            }
                            mdata[n].push(huForm.getItemValue($item, config));
                        } else {
                            mdata[n] = huForm.getItemValue($item, config);
                        }
                    }
                }
            }
        });
        return mdata;
    }

    static getItemValue($form: JQuery, settings: formGetConfig = {}) {
        let config = huForm.getConfig;
        $.extend(true, config, settings);
        let data: any = '';
        if ($form.is('IMG')) {
            data = $form.attr('src');
        } else if ($form.is('input[type="checkbox"],input[type="radio"]')) {
            const input = (<HTMLInputElement>$form[0]);
            if ($form.is('['+huForm.attrSwitch+']')) {
                data = input.checked;
            } else if (input.checked) {
                data = $form.val();
            }
        } else if ($form.is('input,select,textarea')) {
            data = $form.val();
        } else {
            if ($form.is('['+huForm.attrGet+']')) {
                data = eval($form.attr(huForm.attrGet))($form);
            } else if ($form.is('['+huForm.attrContainer+']')) {
                data = $form.find('['+huForm.attrItem+']').html();
            } else {
                data = $form.html();
            }
        }
        const attrAfterGet = $form.attr(huForm.attrAfterGet);
        if (attrAfterGet) {
            data = eval(attrAfterGet)(data);
        }
        return data;
    }
}
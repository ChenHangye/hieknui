class formService {
    static defaultData = {
        "sourceJson": [{ "task": "1", "crawlConfig": ["3", "1"] }, { "task": "2", "crawlConfig": ["2"] }],
        "projectJson": {
            "phraseConfigBeanList": [{
                "infoBoxKeyList": {
                    "infoBoxKeyList": "6",
                    "valueExtrator": "7",
                    "valueExtratorIndex": "8",
                    "valueJsonPath": "9"
                }, "key": "5"
            }, {
                "infoBoxKeyList": {
                    "infoBoxKeyList": "11",
                    "valueExtrator": "12",
                    "valueExtratorIndex": "13",
                    "valueJsonPath": "14"
                }, "key": "10"
            }], "project": "3", "nameSource": "1", "nameExtrator": "4"
        },
        "filterJson": [{
            "filter": "15",
            "fieldName": "16",
            "regex": "17",
            "type": "string",
            "check": "1",
            "regulation": "equals",
            "regulationValue": ["18", "1811"],
            "regulationValue-1": ""
        }, {
            "filter": "19",
            "fieldName": "20",
            "regex": "21",
            "type": "number",
            "check": "1",
            "regulation": "range",
            "regulationValue": ["22", "2221"],
            "regulationValue-1": "23"
        }],
        "name": "0",
        "test": true
    };

    static addSourceConfig(that) {
        let form = $(that).closest('.parser-create-form');
        let formSub = $(form.find('fieldset')[0]);
        let clone = formSub.clone();
        clone.find('#parser-crawlConfig').siblings().remove();
        huForm.setFormData(clone, {});
        formSub.parent().append(clone);
        return clone;
    };

    static removeSourceConfig(that) {
        $(that).closest('fieldset').remove();
    };

    static changeNameSource(that) {
        let form = $(that).closest('fieldset');
        form.find('#project-nameExtrator').val('');
        if (that.value == 1) {
            form.find('#project-nameExtrator').closest('.form-group').removeClass('hide');
        } else {
            form.find('#project-nameExtrator').closest('.form-group').addClass('hide');
        }
    };

    static addProjectConfig(that) {
        let form = $(that).closest('fieldset');
        let formSub = $(form.find('fieldset[name="phraseConfigBeanList"]')[0]);
        let clone = formSub.clone();
        huForm.setFormData(clone, {});
        formSub.parent().append(clone);
        return clone;
    };

    static removeProjectConfig(that) {
        $(that).closest('fieldset').remove();
    };

    static viewProjectConfig(that) {
        let form = $(that).closest('fieldset');
        form.children(':gt(0)').toggleClass('hide');
    };

    static viewPhraseConfig(that) {
        let form = $(that).closest('.fieldset-container');
        form.children(':gt(0)').toggleClass('hide');
    };

    static cancelProjectConfig(that) {
        let form = $(that).closest('fieldset[name="projectJson"]');
        form.find('#parser-project').val('');
        let $container = form.children('fieldset');
        $container.find('fieldset[name="phraseConfigBeanList"]:gt(0)').remove();
        huForm.setFormData($container, {});
        $container.find('#project-nameSource').trigger('change');
        form.children(':gt(0)').addClass('hide');
        // form.find('#project-config-detail').prop('disabled', true);
    };

    static createProjectConfig(that) {
        let form = $(that).closest('fieldset');
        form.children(':gt(0)').removeClass('hide');
        form.find('#parser-project').val('');
        let $container = form.children('fieldset');
        $container.find('fieldset[name="phraseConfigBeanList"]:gt(0)').remove();
        huForm.setFormData($container, {});
        $container.find('#project-nameSource').trigger('change');
    };

    static getProjectConfig($dlg) {
        let formData = huForm.getFormData($dlg);
        console.log(formData);
    };

    static changeType(that) {
        let form = $(that).closest('fieldset');
        form.find('#filter-regulation').val('');
        form.find('#filter-regulation').children('.t-' + that.value).removeClass('hide');
        form.find('#filter-regulation').children(':not(.t-' + that.value + ')').addClass('hide');
        form.find('#filter-regulationValue').val('');
        form.find('#filter-regulationValue-1').val('').addClass('hide');
    };

    static changeRegulation(that) {
        let $obj = $(that).closest('fieldset').find('#filter-regulationValue-1').val('');
        that.value == 'range' ? $obj.removeClass('hide') : $obj.addClass('hide');
    };

    static addFilterConfig(that) {
        let form = $(that).closest('.form-group');
        let formSub = $(form.find('fieldset[name="filterJson"]')[0]);
        let clone = formSub.clone();
        huForm.setFormData(clone, {});
        formSub.parent().append(clone);
        clone.children(':gt(0)').removeClass('hide');
        return clone;
    };

    static removeFilterConfig(that) {
        $(that).closest('fieldset').remove();
    };

    static viewFilterConfig(that) {
        let form = $(that).closest('fieldset');
        form.children(':gt(0)').toggleClass('hide');
    };

    static cancelFilterConfig(that) {
        let form = $(that).closest('fieldset[name="filterJson"]');
        form.find('#parser-filter').val('');
        let $container = form.children('fieldset');
        huForm.setFormData($container, {});
        $container.find('#filter-type').trigger('change');
        form.children(':gt(0)').addClass('hide');
        // form.find('#filter-config-detail').prop('disabled', true);
    };

    static createFilterConfig(that) {
        let form = $(that).closest('fieldset');
        form.children(':gt(0)').removeClass('hide');
        form.find('#parser-filter').val('');
        let $container = form.children('fieldset');
        huForm.setFormData($container, {});
        $container.find('#filter-type').trigger('change');
    };

    static getFilterConfig($dlg) {
        let formData = huForm.getFormData($dlg);
        console.log(formData);
    };

    static  setParser() {
        let $dlg = $('.parser-create-form');
        huForm.setFormData($dlg, formService.defaultData);
    };

    static saveParser() {
        let $dlg = $('.parser-create-form');
        let formData = huForm.getFormData($dlg);
        console.log(formData);
        console.log(JSON.stringify(formData));
        console.log(JSON.stringify(formService.defaultData));
        console.log(_.isEqual(formData, formService.defaultData));
    };
}

$(() => {
    new formService();
});
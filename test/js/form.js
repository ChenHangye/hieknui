(function (window, $, kg) {
    'use strict';

    window.formService = formService();

    function formService() {
        var formService = {
                defaultData: {
                    "sourceJson": [{"task": "1", "crawlConfig": ["3", "1"]}, {"task": "2", "crawlConfig": ["2"]}],
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
                }
            }
        ;

        formService.addSourceConfig = function (that) {
            var form = $(that).closest('.parser-create-form');
            var formSub = $(form.find('fieldset')[0]);
            var clone = formSub.clone();
            clone.find('#parser-crawlConfig').siblings().remove();
            kg.setFormData(clone, {});
            formSub.parent().append(clone);
            return clone;
        };

        formService.removeSourceConfig = function (that) {
            $(that).closest('fieldset').remove();
        };

        formService.changeNameSource = function (that) {
            var form = $(that).closest('fieldset');
            form.find('#project-nameExtrator').val('');
            if (that.value == 1) {
                form.find('#project-nameExtrator').closest('.form-group').removeClass('hide');
            } else {
                form.find('#project-nameExtrator').closest('.form-group').addClass('hide');
            }
        };

        formService.addProjectConfig = function (that) {
            var form = $(that).closest('fieldset');
            var formSub = $(form.find('fieldset[name="phraseConfigBeanList"]')[0]);
            var clone = formSub.clone();
            kg.setFormData(clone, {});
            formSub.parent().append(clone);
            return clone;
        };

        formService.removeProjectConfig = function (that) {
            $(that).closest('fieldset').remove();
        };

        formService.viewProjectConfig = function (that) {
            var form = $(that).closest('fieldset');
            form.children(':gt(0)').toggleClass('hide');
        };

        formService.viewPhraseConfig = function (that) {
            var form = $(that).closest('.fieldset-container');
            form.children(':gt(0)').toggleClass('hide');
        };

        formService.cancelProjectConfig = function (that) {
            var form = $(that).closest('fieldset[name="projectJson"]');
            form.find('#parser-project').val('');
            var $container = form.children('fieldset');
            $container.find('fieldset[name="phraseConfigBeanList"]:gt(0)').remove();
            kg.setFormData($container, {});
            $container.find('#project-nameSource').trigger('change');
            form.children(':gt(0)').addClass('hide');
            // form.find('#project-config-detail').prop('disabled', true);
        };

        formService.createProjectConfig = function (that) {
            var form = $(that).closest('fieldset');
            form.children(':gt(0)').removeClass('hide');
            form.find('#parser-project').val('');
            var $container = form.children('fieldset');
            $container.find('fieldset[name="phraseConfigBeanList"]:gt(0)').remove();
            kg.setFormData($container, {});
            $container.find('#project-nameSource').trigger('change');
        };

        formService.getProjectConfig = function ($dlg) {
            var formData = kg.getFormData($dlg);
            console.log(formData);
        };


        formService.changeType = function (that) {
            var form = $(that).closest('fieldset');
            form.find('#filter-regulation').val('');
            form.find('#filter-regulation').children('.t-' + that.value).removeClass('hide');
            form.find('#filter-regulation').children(':not(.t-' + that.value + ')').addClass('hide');
            form.find('#filter-regulationValue').val('');
            form.find('#filter-regulationValue-1').val('').addClass('hide');
        };

        formService.changeRegulation = function (that) {
            var $obj = $(that).closest('fieldset').find('#filter-regulationValue-1').val('');
            that.value == 'range' ? $obj.removeClass('hide') : $obj.addClass('hide');
        };

        formService.addFilterConfig = function (that) {
            var form = $(that).closest('.form-group');
            var formSub = $(form.find('fieldset[name="filterJson"]')[0]);
            var clone = formSub.clone();
            kg.setFormData(clone, {});
            formSub.parent().append(clone);
            clone.children(':gt(0)').removeClass('hide');
            return clone;
        };

        formService.removeFilterConfig = function (that) {
            $(that).closest('fieldset').remove();
        };

        formService.viewFilterConfig = function (that) {
            var form = $(that).closest('fieldset');
            form.children(':gt(0)').toggleClass('hide');
        };

        formService.cancelFilterConfig = function (that) {
            var form = $(that).closest('fieldset[name="filterJson"]');
            form.find('#parser-filter').val('');
            var $container = form.children('fieldset');
            kg.setFormData($container, {});
            $container.find('#filter-type').trigger('change');
            form.children(':gt(0)').addClass('hide');
            // form.find('#filter-config-detail').prop('disabled', true);
        };

        formService.createFilterConfig = function (that) {
            var form = $(that).closest('fieldset');
            form.children(':gt(0)').removeClass('hide');
            form.find('#parser-filter').val('');
            var $container = form.children('fieldset');
            kg.setFormData($container, {});
            $container.find('#filter-type').trigger('change');
        };

        formService.getFilterConfig = function ($dlg) {
            var formData = kg.getFormData($dlg);
            console.log(formData);
        };

        formService.setParser = function () {
            var $dlg = $('.parser-create-form');
            kg.setFormData($dlg, formService.defaultData);
        };

        formService.saveParser = function () {
            var $dlg = $('.parser-create-form');
            var formData = kg.getFormData($dlg);
            console.log(formData);
            console.log(JSON.stringify(formData));
            console.log(JSON.stringify(formService.defaultData));
            console.log(_.isEqual(formData, formService.defaultData));
        };

        return formService;
    }
})(window, jQuery, huForm);

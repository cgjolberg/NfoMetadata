﻿define(['loading', 'globalize', 'emby-input', 'emby-button', 'emby-select', 'emby-checkbox'], function (loading, globalize) {
    'use strict';

    function loadPage(page, config) {

        ApiClient.getUsers().then(function (users) {
            var html = '<option value="" selected="selected">' + globalize.translate('OptionNone') + '</option>';

            html += users.map(function (user) {
                return '<option value="' + user.Id + '">' + user.Name + '</option>';
            }).join('');

            var selectUser = page.querySelector('#selectUser');
            selectUser.innerHTML = html;
            selectUser.value = config.UserId || '';

            page.querySelector('#selectReleaseDateFormat').value = config.ReleaseDateFormat;

            page.querySelector('#chkSaveImagePaths').checked = config.SaveImagePathsInNfo;
            page.querySelector('#chkEnablePathSubstitution').checked = config.EnablePathSubstitution;
            page.querySelector('#chkEnableExtraThumbs').checked = config.EnableExtraThumbsDuplication;

            loading.hide();
        });
    }

    function onSubmit(e) {

        e.preventDefault();

        loading.show();

        var form = this;

        ApiClient.getNamedConfiguration("xbmcmetadata").then(function (config) {

            config.UserId = form.querySelector('#selectUser').value || null;
            config.ReleaseDateFormat = form.querySelector('#selectReleaseDateFormat').value;

            config.SaveImagePathsInNfo = form.querySelector('#chkSaveImagePaths').checked;
            config.EnablePathSubstitution = form.querySelector('#chkEnablePathSubstitution').checked;
            config.EnableExtraThumbsDuplication = form.querySelector('#chkEnableExtraThumbs').checked;

            ApiClient.updateNamedConfiguration("xbmcmetadata", config).then(Dashboard.processServerConfigurationUpdateResult);
        });

        // Disable default form submission
        return false;
    }

    function getConfig() {

        return ApiClient.getNamedConfiguration("xbmcmetadata");
    }

    return function (view, params) {

        view.querySelector('form').addEventListener('submit', onSubmit);

        view.addEventListener('viewshow', function () {

            loading.show();

            var page = this;

            getConfig().then(function (response) {

                loadPage(page, response);
            });
        });
    };

});

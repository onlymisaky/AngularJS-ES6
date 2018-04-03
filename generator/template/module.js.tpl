import angular from 'angular';
<%if import uiRouter from '@uirouter/angularjs'; endif%>

import <% FileName %> from '<% filename %>.component';

export default angular
    .module('app.<% fileType %>.<% filename %>', [<%if uiRouter endif%>])
    .component('<% fileName %>', <% FileName %>)
    .name;

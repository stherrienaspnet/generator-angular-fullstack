'use strict';
/* eslint no-sync: 0 */
import angular from 'angular';

export class NavbarComponent {
  menu = [{
    <% if (filters.i18nSupport) { %>
      'title': 'HOME', 
    <% } %>
    <% if (!filters.i18nSupport) { %>
      'title': 'Home',  
    <% } %>
    <% if (filters.uirouter) { %>'state': 'main'<% } else { %>'link': '/'<% } %>
  }];
  <%_ if(!filters.uirouter) { -%>
  $location;
  <%_ } -%>
  <%_ if (filters.auth) { -%>
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  <%_ } -%>
  isCollapsed = true;
  <%_ if(filters.ngroute || filters.auth) { _%>

  constructor(<% if(!filters.uirouter) { %>$location<% } if(!filters.uirouter && filters.auth) { %>, <% } if (filters.auth) { %>Auth<% } %><% if (filters.i18nSupport) { %>, $translate<% } %>) {
    'ngInject';
    <% if (filters.i18nSupport) { %>
      this.$translate = $translate; 
      this.currentLocale = $translate.proposedLanguage(); 
    <% } %>
    <%_ if(!filters.uirouter) { _%>
    this.$location = $location;
    <%_ } _%>
    <%_ if (filters.auth) { _%>
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    <%_ } _%>
  }<% } %>
  <%_ if(!filters.uirouter) { _%>

  isActive(route) {
    return route === this.$location.path();
  }<% } %>
}

<% if (filters.i18nSupport) { %>
  changeLocale(localeKey){ 
    this.$translate.use(localeKey); 
    this.currentLocale = localeKey; 
  } 
<% } %>

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.<%= templateExt %>'),
    controller: NavbarComponent
  })
  .name;

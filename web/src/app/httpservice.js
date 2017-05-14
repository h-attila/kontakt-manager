'use strict';

// *****************************************************************************
// IMPORTANT! Set your server url here!
// *****************************************************************************
//
// for localhost testing
// const appUrl = 'http://localhost:3000';
//
// for raptors web
const appUrl = 'https://raptor-konnekt.herokuapp.com';
//
// *****************************************************************************

const konnektApp = angular.module('konnektApp');

konnektApp.factory('HttpService', ['$http', function ($http) {

  function login(userData) {
    return $http.post(`${appUrl}/login`, JSON.stringify(userData), { withCredentials: true });
  }

  function register(userData) {
    return $http.post(`${appUrl}/register`, JSON.stringify(userData));
  }

  function createContact(sessionToken, contactData) {
    return $http.post(`${appUrl}/contacts`, JSON.stringify(contactData), { headers: { session_token: sessionToken } });
  }

  function getAllContacts(sessionToken) {
    return $http.get(`${appUrl}/contacts`, { headers: { session_token: sessionToken } });
  }

  function editContact(id, sessionToken, userData) {
    return $http.put(`${appUrl}/contact/` + id, JSON.stringify(userData), { headers: { session_token: sessionToken } });
  }

  function deleteContact(sessionToken, id) {
    return $http.delete(`${appUrl}/contact/${id}`, { headers: { session_token: sessionToken } });
  }

  return {
    login: login,
    register: register,
    getAllContacts: getAllContacts,
    editContact: editContact,
    deleteContact: deleteContact,
    createContact: createContact,
  };
}]);

'use strict';

const konnektApp = angular.module('konnektApp');

konnektApp.factory('ContactDataHandling', ['HttpService', '$window', function (HttpService, $window) {

  var contactData = {};

  // returns stored contact info
  function getContactData() {
    return contactData;
  }

  // read contact info from server
  function setContactData(sessionToken) {
    return HttpService.getAllContacts(sessionToken)
    .then(function (successResponse) {
      if (successResponse.status === 200) {
        contactData = successResponse.data.contacts;
      } else {
        console.log('contact data loading error');
      }
    });
  }

  // edit contact data - popup
  function editContactData(id, sessionToken, userData) {
    return HttpService.editContact(id, sessionToken, userData)
    .then(function (successResponse) {
      if (successResponse.status === 200) {
        setContactData(sessionToken).then(function () {
          $window.location.href = '#!/dashboard';
        });
      } else {
        console.log('edit data error');
      }
    }, function (errorResponse) {
      if (errorResponse.status === 401) {
        console.log('ERROR: 401 status from server');
        $window.location.href = '#!/login';
      } else {
        console.log('ERROR: no data from server');
        $window.location.href = '#!/login';
      }
    });
  }

  // delete single contact data
  function deleteContact(sessionToken, contactId) {
    return HttpService.deleteContact(sessionToken, contactId);
  }

  // add new contact data
  function createContactData(sessionToken, contactData) {
    return HttpService.createContact(sessionToken, contactData)
    .then(function (successResponse) {
      if (successResponse.status === 201) {
        setContactData(sessionToken).then(function () {
          $window.location.href = '#!/dashboard';
        });
      } else {
        console.log('edit data error');
      }
    }, function (errorResponse) {
      if (errorResponse.status === 401) {
        console.log('ERROR: 401 status from server');
        $window.location.href = '#!/login';
      } else {
        console.log('ERROR: no data from server');
        $window.location.href = '#!/login';
      }
    });
  }

  return {
    getContactData: getContactData,
    setContactData: setContactData,
    editContactData: editContactData,
    deleteContact: deleteContact,
    createContactData: createContactData,
  };
}]);

import ReactOnRails from 'react-on-rails';
import $ from 'jquery';
import Router from '../components/Router';

$(document).ready(() => {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
    },
  });
});

/* Init app */
ReactOnRails.register({
  Router,
});

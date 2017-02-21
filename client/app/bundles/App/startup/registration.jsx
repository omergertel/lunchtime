import ReactOnRails from 'react-on-rails';
import $ from 'jquery'

import Router from '../components/Router';

/* Utils */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});

/* Init app */
ReactOnRails.register({
  Router,
});

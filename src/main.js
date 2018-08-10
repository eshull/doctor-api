import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { DoctorService } from './doctor_service';

$(document).ready(function() {

  $('#searchTerm').submit(function(event) {
    event.preventDefault();
    console.log("form submit");
    let input = $("#searchTerm").find('input[name=symptoms]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    console.log("doctor service " + doctorService);
    let promise = doctorService.getInfoByInput(input);
    console.log(promise);

      promise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log("body" + body);
       // let array = body.artObjects;
       console.log("craig");
       // for (var i = 0; i < array.length; i++) {
       //   console.log("here");
       //   $('#artwork').append("<img src=" + array[i].webImage.url + ">");
       //   }


      });

  });
});

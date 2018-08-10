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
    let promise = doctorService.getSymptomByInput(input);
    console.log(promise);

      promise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log(JSON.parse(response));
       console.log("body" + body);
       let array = body.data;
       console.log("test" + body.data[1].profile.first_name);
       for (var i = 0; i < array.length; i++) {
         console.log("here");
         $('#doctors').append("<p>" + array[i].profile.first_name + "</p>");
         }


      });

  });
});

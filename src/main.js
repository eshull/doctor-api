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
    let symptomPromise = doctorService.getSymptomByInput(input);
    let doctorPromise = doctorService.getSymptomByInput(input);


      symptomPromise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log(JSON.parse(response));
       let array = body.data;
       for (var i = 0; i < array.length; i++) {
         console.log("here");
         $('#doctorsSymptoms').append("<h2>" + array[i].profile.first_name + " " + array[i].profile.last_name + " " +  array[i].profile.title + "</h2>");
         $('#doctorsSymptoms').append("<h5>" + array[i].specialties[0].description + "</h5>");
         $('#doctorsSymptoms').append("<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>");
         }
      });
      doctorPromise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log(JSON.parse(response));
       let array = body.data;
       for (var i = 0; i < array.length; i++) {
         console.log("here");
         $('#doctorsSymptoms').append("<h2>" + array[i].profile.first_name + " " + array[i].profile.last_name + " " +  array[i].profile.title + "</h2>");
         $('#doctorsSymptoms').append("<h5>" + array[i].specialties[0].description + "</h5>");
         $('#doctorsSymptoms').append("<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>");
         }
      });

  });
});

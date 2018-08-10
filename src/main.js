import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { DoctorService } from './doctor_service';

$(document).ready(function() {

  $('#symptomForm').submit(function(event) {
    event.preventDefault();
    console.log("form submit");
    let symptomInput = $("#symptomForm").find('input[name=symptoms]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let symptomPromise = doctorService.getSymptomByInput(symptomInput);

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

  });

  $('#doctorForm').submit(function(event) {
    event.preventDefault();
    console.log("form submit");
    let doctorInput = $("#doctorForm").find('input[name=doctorsInfo]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let doctorPromise = doctorService.getSymptomByInput(doctorInput);

      doctorPromise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log(JSON.parse(response));
       let array = body.data;
       // irst name, last name, address, phone number, website and whether or not the doctor is accepting new patients
       for (var i = 0; i < array.length; i++) {
         console.log("here");
         $('#doctorsInformation').append("<h2>" + array[i].practices[0].visit_address + " " + array[i].practices[0].office_hours + " " + array[i].practices[0].phones + "</h2>");
         $('#doctorsInformation').append("<h3>" + array[i].profile.first_name + " " + array[i].profile.last_name + " " +  array[i].profile.title + "</h3>");
         $('#doctorsInformation').append("<h5>" + array[i].specialties[0].description + "</h5>");
         $('#doctorsInformation').append("<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>");
         }
      });

  });
});

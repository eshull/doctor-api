import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { DoctorService } from './doctor_service';

$(document).ready(function() {

  $('#symptomForm').submit(function(event) {
    event.preventDefault();
    // if (document.getElementById("#doctorsSymptoms") == null){
    //   return " "
    // } else {
    //   (function clear(){
    //     return document.getElementById("#doctorsSymptoms").innerHTML = ""
    //   }());
    // }

    console.log("form submit");
    let symptomInput = $("#symptomForm").find('input[name=symptoms]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let symptomPromise = doctorService.getDoctorBySymptom(symptomInput);
    console.log(symptomPromise);

    symptomPromise.then(function(response) {
     let body = JSON.parse(response);
       if (body.data.length == 0) {
          $('#doctorsSymptoms').append("<h3>" + "Search returned no results" + "</h3>");
       } else {
           let array = body.data;
           for (var i = 0; i < array.length; i++) {
             console.log("here");
             $('#doctorsSymptoms').append("<h2>" + array[i].profile.first_name + " " + array[i].profile.last_name + " " +  array[i].profile.title + "</h2>");
             $('#doctorsSymptoms').append("<h5>" + array[i].specialties[0].description + "</h5>");
             $('#doctorsSymptoms').append("<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>");
           }
         }
       }, function(error) {
           $('.errorMessage').text(`Error: ${error.message}`);
    });
  });

  $('#doctorForm').submit(function(event) {
    event.preventDefault();
    console.log("form submit");
    let doctorInput = $("#doctorForm").find('input[name=doctorsInfo]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let doctorPromise = doctorService.getDoctorByName(doctorInput);

      doctorPromise.then(function(response) {
        console.log("response " + response );
       let body = JSON.parse(response);
       console.log(JSON.parse(response));
       let array = body.data;
       for (var i = 0; i < array.length; i++) {
         console.log("here");
         $('#doctorsInformation').append("<h1>" +
         array[i].profile.first_name + " " +
         array[i].profile.last_name + " " +
         array[i].profile.title + "</h1>");
         $('#doctorsInformation').append("<h4>" + array[i].specialties[0].description + "</h4>");
         $('#doctorsInformation').append("<h2>" + array[i].practices[0].visit_address.street + " " + array[i].practices[0].visit_address.city + " " +
         array[i].practices[0].visit_address.state + " " +
         array[i].practices[0].visit_address.zip + " " + "</h2>");
         $('#doctorsInformation').append("<h2>" + "Phone: " + array[i].practices[0].phones[0].number + "</h2>");
         $('#doctorsInformation').append("<h2>" + "Accepting new patients? " + array[i].practices[0].accepts_new_patients + "</h2>");
         $('#doctorsInformation').append("<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>");
         }
      });

  });
});

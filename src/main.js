import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { DoctorService } from './doctor_service';

$(document).ready(function() {
  $('#symptomForm').submit(function(event) {
    event.preventDefault();
    let symptomInput = $("#symptomForm").find('input[name=symptoms]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let symptomPromise = doctorService.getDoctorBySymptom(symptomInput);

    symptomPromise.then(function(response) {
     let body = JSON.parse(response);
       if (body.data.length == 0) {
          $('#doctorsSymptoms').append("<h3>" + "Search returned no results" + "</h3>");
       } else {
           let array = body.data;
           for (var i = 0; i < array.length; i++) {
             $('#doctorsSymptoms').append("<div class='doctor'>" + "<h2>" + array[i].profile.first_name + " " +
             array[i].profile.last_name + " " +
             array[i].profile.title + "</h2>" +
             "<h5>" + array[i].specialties[0].description + "</h5>" +
             "<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>" + "</div>");
           }
         }
       }, function(error) {
           $('.errorMessage').text(`Error: ${error.message}`);
    });
  });

  $('#doctorForm').submit(function(event) {
    event.preventDefault();
    let doctorInput = $("#doctorForm").find('input[name=doctorsInfo]').val();
    $('#searchTerm').val("");
    let doctorService = new DoctorService();
    let doctorPromise = doctorService.getDoctorByName(doctorInput);

      doctorPromise.then(function(response) {
       let body = JSON.parse(response);
       if (body.data.length == 0) {
           $('#doctorsSymptoms').append("<h3>" + "Search returned no results" + "</h3>");
       } else {
           let array = body.data;
           for (var i = 0; i < array.length; i++) {
             $('#doctorsInformation').append("<div class='doctor'>" + "<h1>" +
             array[i].profile.first_name + " " +
             array[i].profile.last_name + " " +
             array[i].profile.title + "</h1>" +
             "<h4>" + array[i].specialties[0].description + "</h4>" +
             "<h2>" + array[i].practices[0].visit_address.street + " " + array[i].practices[0].visit_address.city + " " +
             array[i].practices[0].visit_address.state + " " +
             array[i].practices[0].visit_address.zip + " " + "</h2>" +
             "<h2>" + "Phone: " + array[i].practices[0].phones[0].number + "</h2>" +
             "<h2>" + "Accepting new patients? " + array[i].practices[0].accepts_new_patients + "</h2>" +
             "<p>" + "<h3>" + "Bio:" + "</h3>" + array[i].profile.bio + "</p>" +
            "</div>");
             }
        }
      });
  });
});

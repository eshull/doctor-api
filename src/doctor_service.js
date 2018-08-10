export class DoctorService{
  getSymptomByInput(input){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${input}&location=or-portland&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
         resolve(request.response);
       } else {
         reject(Error(request.statusText));
       }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
  getNameByInput(name) {
   return new Promise(function(resolve, reject) {
     const request = new XMLHttpRequest();
     let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=or-portland&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
     request.onload = function() {
       if (this.status === 200) {
         resolve(request.response);
       } else {
         reject(Error(request.statusText));
       }
     };
     request.open('GET', url, true);
     request.send();
   });
 }
 getConditionByInput() {
   return new Promise(function(resolve, reject) {
     const request = new XMLHttpRequest();
     let url = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=${process.env.exports.apiKey}`;
     request.onload = function() {
       if (this.status === 200) {
         resolve(request.response);
       } else {
         reject(Error(request.statusText));
       }
     };
     request.open('GET', url, true);
     request.send();
   });
 }
}

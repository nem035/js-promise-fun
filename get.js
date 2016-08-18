function get(url) {
  showProgress(url);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        hideProgress(url);
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          showError(url);
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    }, 1000 + Math.random() * 1000);
  });
}

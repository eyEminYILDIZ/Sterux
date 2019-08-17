
function ErrorOnLoad() {
  console.log("err:onload");
}

function ErrorOnUnLoad() {
  // adfadkj
}


function Error(error) {

  var payload = {
    message: error.message,
    fileName: error.filename,
    lineNumber: error.lineno,
    columnNumber: error.colno,
  };
  Send_Error(payload);

  // true: for dont display error on console
  // this is not work for this function because this function is a listener.
  // if you want to make error slient for console; you have to type return true in window.onError method.
  return true;
}
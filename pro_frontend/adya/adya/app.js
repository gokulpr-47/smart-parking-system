Webcam.set({
  width: 640,
  height: 480,
  image_format: "jpeg",
  jpeg_quality: 90,
});
Webcam.attach("#my_camera");
$.ajaxSetup({
  headers: {
    "Content-Type": "application/json",
  },
});

function take_snapshot() {
  // Webcam.snap(function (data_uri) {    //change
  // console.log(data_uri);   //change
  $.post(
    "http://localhost:3000/api/v1/services/anpr",
    // JSON.stringify({ file: data_uri }),    //change
    function (data, status) {
      console.log(data);
    }
  );
  // });

  // $.ajax({
  //   type: "POST",
  //   url: "http://localhost:3000/api/v1/services/anpr",
  //   contentType: "image/jpeg",
  //   // data: JSON.stringify({ file: data_uri }),
  //   // success: function (data, status) {
  //   //   console.log("Second POST request:", data);
  //   // },
  //   // error: function (xhr, status, error) {
  //   //   console.error("Error in second POST request:", error);
  //   // },
  // });
}

//parking-spot

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
  Webcam.snap(function (data_uri) {
    //change
    // console.log(data_uri); //change
    $.post(
      "http://localhost:3000/api/v1/services/anpr",
      JSON.stringify({ file: data_uri }), //change
      function (data, status) {
        // console.log(data);
      }
    );
  });

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

// function exit_snapshot(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   var image;
//   Webcam.snap(function (data_uri) {
//     //change
//     // console.log(data_uri);   //change
//     $.post(
//       "http://localhost:3000/api/v1/services/exit",
//       JSON.stringify({ file: data_uri }), //change
//       function (data, status) {
//         // Create a new window or tab
//         image = data;
//         var win = window.open("", "_blank");
//         // Write the server response into the new window
//         win.document.write(data);
//       }
//     );
//   });
// }

$(".exitButton").on("click", function (event) {
  event.preventDefault();
  Webcam.snap(function (data_uri) {
    $.post(
      "http://localhost:3000/api/v1/services/exit",
      JSON.stringify({ file: data_uri }),
      function (data, status) {
        window.location.href =
          "http://127.0.0.1:5500/pro_frontend/adya/adya/payment.html?data=" +
          encodeURIComponent(data.data);
      }
    );
  });
});

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
		// console.log(data_uri);
		$.post(
			"http://localhost:3000/api/v1/services/anpr",
			JSON.stringify({ file: data_uri }),
			function (data, status) {
				console.log(data);
			}
		);
	});
}

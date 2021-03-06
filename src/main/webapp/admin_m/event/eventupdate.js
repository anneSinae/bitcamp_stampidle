try {
  var eventNo = location.href.split('?')[1].split('=')[1];
  console.log(eventNo);
  
} catch (error) {
	var eventNo = -1;
}
var now = new Date();
var year= now.getFullYear();
var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
        
var chan_val = year + '-' + mon + '-' + day;

/*
if (eventNo > 0) {
	prepareViewForm();
} else {
	prepareNewForm();
}
*/


$.getJSON(serverRoot + '/admin_m/event/detail.json?eventNo=' + eventNo, function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var event = ajaxResult.data;
  console.log(event);
  
  $('#photo-img').attr('src', '../../upload/' + event.eventPhotoPath);
  $('#banner-img').attr('src', '../../upload/' + event.eventBannerPhotoPath);
  $('.location-div .event-title').val(event.eventTitle);
  $('.startdiv .startDate').val(event.startDate);
  $('.endDate').val(event.endDate);
  $('.event-contents').val(event.eventContents);


$('.edit-event').click(function() {
	$.getJSON(serverRoot + '/admin_m/auth/loginUser.json', function(ajaxResult) {
		if (ajaxResult.status != "success") {
			console.log(ajaxResult.data);
			location.href = clientRoot + "/admin_m/auth/login.html";
			
		}
		var cafeMemberNo = ajaxResult.data.cafeMemberNo;


    var param = {
		"cafeMemberNo": cafeMemberNo,
		"eventTitle": $('.event-title').val(),
		"eventContents": $('.event-contents').val(),
		"registDate": chan_val,
		"eventPhotoPath": $('#photo-path').val(),
		"eventBannerPhotoPath": $('#banner-photo-path').val(),
		"eventView": 0,
		"startDate": $('.startDate').val(),
		"endDate": $('.endDate').val(),
		"eventNo":eventNo
    };
    
    $.post(serverRoot + '/admin_m/event/update.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	location.href = 'eventlist.html';
    }, 'json');
    
}); // click()

});
});
$('#use-btn-delete').click(function() {
  $.getJSON(serverRoot + '/admin_m/event/delete.json?eventNo=' + eventNo, function(ajaxResult) {
	  if (ajaxResult.status != "success") { 
		  alert(ajaxResult.data);
		  return;
	  }
	  location.href = clientRoot + '/admin_m/event/eventlist.html';
  });
});


$('#use-btn-edit').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/admin_m/event/eventupdate.html?eventNo='+ eventNo
});





$('#photo').fileupload({
  url: 'http://b.bitcamp.com:8080/bitcamp_stampidle/common/fileupload.json', // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
  autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
  disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 800,   // 미리보기 이미지 너비
  previewMaxHeight: 800,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
  	console.log('done()...');
  	console.log(data.result);
      $('#photo-path').val(data.result.data[0]);
  }, 
  processalways: function(e, data) {
      console.log('fileuploadprocessalways()...', data.files.length, data.index);
      var img = $('#photo-img');
      if (data.index == 0) {
      	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '100%');
	        img.attr('src', dataURL).css('height', '100%');
	        $('#photo-label').css('display', '');
      }
  } 
});

/************ 배너 이미지 저장 **************/
$('#banner-fileupload').fileupload({
url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
	console.log('done()...');
	console.log(data.result);
    $('#banner-photo-path').val(data.result.data[0]);
}, 
processalways: function(e, data) {
  console.log('fileuploadprocessalways()...', data.files.length, data.index);
  var img = $('#banner-img');
  if (data.index == 0) {
    console.log('미리보기 처리...');
    var canvas = data.files[0].preview;
    var dataURL = canvas.toDataURL();
    img.attr('src', dataURL).css('height', '100%');
    img.attr('src', dataURL).css('width', '100%');
 }
}
});

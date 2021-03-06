$(function() {
	// header.html을 가져와서 붙인다.
	$.get(clientRoot + '/header.html', function(result) {
		// 서버에서 로그인 사용자 정보를 가져온다.
		$('#header').html(result);
		$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
			var loginUser = ajaxResult.data;

			if (ajaxResult.status == "fail") { // 로그인 되지 않았으면,
				// 로그온 상태 출력 창을 감춘다.
				$('#logon-div').css('display', 'none');

				// 로그인 버튼의 클릭 이벤트 핸들러 등록하기
				$('#login-btn').click(function(event) {
					event.preventDefault()
					location.href = clientRoot + '/auth/login.html'
				});
				return;
			}

			$('#logoff-div').css('display', 'none');
			$('#logon-div .cafeNm').text(loginUser.id).attr('data-no',loginUser.cafeMemberNo);

			$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + loginUser.cafeMemberNo, function(ajaxResult1) {
				var cafeinfo = ajaxResult1.data;
				if (ajaxResult1.status == "fail") {
					$('#logon-div .profileImg img').attr('src', '../../image/logo_markW.png');
				} else if (cafeinfo.logPath == null || cafeinfo.logPath == "") {
					$('#logon-div .profileImg img').attr('src', '../../image/logo_markW.png');
				} else {
					$('#logon-div .profileImg img').attr('src', '../../upload/' + cafeinfo.logPath);
				}
			});

			// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
			$('#logout-btn').click(function(event) {
				event.preventDefault()
				$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
					swal({
						  title: "간편한 도장관리 스탬피들",
						  closeOnConfirm: true,
						  imageUrl:"../../image/pabi.png"
						},
						function(isConfirm) {
							location.href = clientRoot + '/auth/login.html'
						});
				});
			});
		});
	});

	// sidebar.html을 가져와서 붙인다.
	$.get(clientRoot + '/sidebar.html', function(result) {
		$('#sidebar').html(result);
		
		//페이지인식
		var pageName = $('body').attr("data-pageName");
		switch(pageName) {
		case 'MAIN': $('.mnList .searchCstmr').addClass("active"); break;
		case 'CUSTOMERLIST': $('.mnList .customerlist').addClass("active"); break;
		case 'STAMPLOG': $('.mnList .stampLoglist').addClass("active"); break;
		case 'CAFEINFO': $('.mnList .cafeInfo').addClass("active"); break;
		case 'EVENT': $('.mnList .event').addClass("active"); break;
		}
	});
});




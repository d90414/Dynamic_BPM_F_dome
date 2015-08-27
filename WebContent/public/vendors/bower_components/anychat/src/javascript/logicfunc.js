
//var mDefaultServerAddr = "demo.anychat.cn";       // 默认服务器地址 
var company_id = "15100";
var mDefaultServerAddr = "10.28.20.1";//"10.40.1.23"
var mDefaultServerPort = 8906;
var mUserName = "13820490531";

var mSeatID = null;
var mSelfUserId = -1; // 本地用户ID
var mTargetUserId = 0; // 目标用户ID（请求了对方的音视频）
var mRefreshVolumeTimer = -1; // 实时音量大小定时器
var mRefreshPluginTimer = -1; // 检查插件是否安装完成定时器
var initSDKRetCode; // 检查插件是否安装完成返回代码

var RECOED_TIMEOUT_HAND = -1;
var RECOED_FILE_PATH = "";
var RECOED_FILE_URL = "";
var VIDEO_TEXT = "Hello, AnyChat!";
var VIDEO_IMG = window.location.href.substring(0, window.location.href.indexOf("#")) + "public/images/screenShotTip.png";

function LogicInit(phoneNum, business_id, session_id, user_id, busilogno) {
    setTimeout(function() {
    	if (navigator.plugins && navigator.plugins.length) {
            window.navigator.plugins.refresh(false);
        }
    	// 检查是否安装了插件
        var NEED_ANYCHAT_APILEVEL = "0"; // 定义业务层需要的AnyChat API Level
        initSDKRetCode = BRAC_InitSDK(NEED_ANYCHAT_APILEVEL); // 初始化插件
        AddLog("BRAC_InitSDK(" + NEED_ANYCHAT_APILEVEL + ")=" + initSDKRetCode);
        //AddProcInfo("正在初始化插件");

        if (initSDKRetCode == GV_ERR_SUCCESS) {
        	// 此次视频的存储路径由外部传入
        	/*var nret1 = BRAC_SetSDKOption(BRAC_SO_RECORD_TMPDIR, "E:\\Record\\");
        	AddLog("nret1=(" + nret1 + ")");*/
            if (mRefreshPluginTimer != -1) {
            	clearInterval(mRefreshPluginTimer); // 清除插件安装检测定时器
            	$("#VideoLoadingDiv, #prompt_div").toggle(); // 隐藏插件安装提示界面
            }

            AddLog("AnyChat Plugin Version:" + BRAC_GetVersion(0));
            AddLog("AnyChat SDK Version:" + BRAC_GetVersion(1));
            AddLog("Build Time:" + BRAC_GetSDKOptionString(BRAC_SO_CORESDK_BUILDTIME));

            AddProcInfo("正在初始化插件");//AddProcInfo("正在初始化会话，等待请求坐席");
        	setTimeout(function() {
        		connectVideoServer(true);//querySessionId(phoneNum, business_id, session_id, user_id, busilogno);
            }, 1000);
        } else { // 没有安装插件，或是插件版本太旧，显示插件下载界面
            if ($("#prompt_div").css("display") == 'none') {
            	$("#VideoLoadingDiv, #prompt_div").toggle();
            	if (initSDKRetCode == GV_ERR_PLUGINNOINSTALL) {
            		// 初始化失败，需要安装插件,提供插件下载链接给客户
            		$("#prompt_div_line").html('首次进入需要安装插件，请点击下载按钮进行安装！');
            	} else if (initSDKRetCode == GV_ERR_PLUGINOLDVERSION) {
            		// 初始化失败，当前插件的版本过低，请下载安装最新版本
            		$("#prompt_div_line").html('检测到当前插件的版本过低，请下载安装最新版本！');
            	}
            }
            if (mRefreshPluginTimer == -1) {
                mRefreshPluginTimer = setInterval(function() {
                    LogicInit();
                }, 1000);
            }
        }
    }, 500);
}

// 设置AnyChat参数，需要在收到登录成功回调之后调用
function ConfigAnyChatParameter() {
 	// 视频抓拍文件存储路径
	BRAC_SetSDKOption(BRAC_SO_SNAPSHOT_TMPDIR, "d:\\AnyChatSnapShot");
	// 视频录制文件存储路径
	BRAC_SetSDKOption(BRAC_SO_RECORD_TMPDIR, "d:\\AnyChatRecord");
	// 设置录制文件格式，0 MP4[默认], 1 WMV, 2 FLV, 3 MP3
	BRAC_SetSDKOption(BRAC_SO_RECORD_FILETYPE, 0);
	// 启动本地Web服务
	BRAC_SetSDKOption(BRAC_SO_ENABLEWEBSERVICE, 1);
}

// 视频参数设置
function ApplyVideoConfig(bitrate, quality, videoWidth, videoHeight, fps, preset) {
	// 设置本地视频编码的码率（如果码率为0，则表示使用质量优先模式）
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_BITRATECTRL, bitrate);
	// 设置本地视频编码的质量
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_QUALITYCTRL, quality);
	// 设置本地视频采集分辨率
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_WIDTHCTRL, videoWidth);
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_HEIGHTCTRL, videoHeight);
	// 设置本地视频编码的帧率
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_FPSCTRL, fps);
	// 设置本地视频编码的关键帧间隔
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_GOPCTRL, fps*4);
	// 设置视频编码预设参数（值越大，编码质量越高，占用CPU资源也会越高）
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_PRESETCTRL, preset);
	// 让视频参数生效
	BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_APPLYPARAM, 1);
}

// 根据id获取标签
function GetID(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (window[id]) {
        return window[id];
    }
    return null;
}

function GetTheTime() {
    var TheTime = new Date();
    return TheTime.toLocaleTimeString();
}

function Getdmo(element) {
    if (document.getElementById) {
        return document.getElementById(element);
    } else if (window[element]) {
        return window[element];
    }
    return null;
}

function showVideoSessionScreen() {
    setVideoShow("AnyChatLocalVideoDiv");//, "AnyChatRemoteVideoDiv"
    setTimeout(function() {
    	setVideoText(VIDEO_TEXT, 40, 0);
		setVideoImg(VIDEO_IMG, 0, 0);
		fillSelectOption("brac_device_videocapture", BRAC_EnumDevices(BRAC_DEVICE_VIDEOCAPTURE));
		if ($("#start_video").css("display") == 'none') {
			$("#waitContent, #start_video").toggle();
		} else {
			$("#brac_device_videocapture").removeAttr("disabled");
		}
	}, 1000);
}

// 设置显示视频位置
function setVideoShow(firVideo) {//, secVideo
    var nret6 = BRAC_SetVideoPos(mSelfUserId, Getdmo(firVideo), "ANYCHAT_VIDEO_LOCAL");
    AddLog("nret6=(" + nret6 + ")");
    AddLog("mSelfUserId==(" + mSelfUserId + ") mTargetUserId==" + mTargetUserId);
    // 禁止本地视频双击全屏显示
    GetID("ANYCHAT_VIDEO_LOCAL").SetSDKOptionInt(ANYCHATWEB_VIDEO_SO_DISABLEFULLSCREEN, 1);
    /*var nret7 = BRAC_SetVideoPos(mTargetUserId, Getdmo(secVideo), "ANYCHAT_VIDEO_REMOTE");
    AddLog("nret7=(" + nret7 + ")");
    AddLog("mTargetUserId=(" + mTargetUserId + ")");*/
}

// 在本地视频上迭加文字
function setVideoText(txt, xpos, ypos) {
	var szOverlayMessage = "<MESSAGE1><VALUE>" + txt + "</VALUE><XPOS>" + xpos + "</XPOS><YPOS>" + ypos + "</YPOS><FONTCOLOR>#FFFF80</FONTCOLOR></MESSAGE1>";
	GetID("ANYCHAT_VIDEO_LOCAL").SetSDKOptionString(ANYCHATWEB_VIDEO_SO_OVERLAY, szOverlayMessage);
}

// 在本地视频上迭加图片
function setVideoImg(pic, xpos, ypos) {
	var szOverlayImage = "<IMAGE1><VALUE>" + pic + "</VALUE><XPOS>" + xpos + "</XPOS><YPOS>" + ypos + "</YPOS></IMAGE1>";
	GetID("ANYCHAT_VIDEO_LOCAL").SetSDKOptionString(ANYCHATWEB_VIDEO_SO_OVERLAY, szOverlayImage);
}

// 单向语音视频录制
function setVideoRecord() {
	if ($("#start_video").css("display") == 'none') {
		$("#finish_record_video").remove();
		$("#play_record_video").remove();
		$("#start_video, #finish_video").toggle();
		BRAC_EnterRoom(1, "", 0);
		return;
	}
	// 画中画模式
	var flags = BRAC_RECORD_FLAGS_VIDEO + BRAC_RECORD_FLAGS_AUDIO + BRAC_RECORD_FLAGS_MIXAUDIO + BRAC_RECORD_FLAGS_MIXVIDEO;
	if ($("#start_video button").text() == "开始录制") {
		$("#start_video button").text("停止录制");
		$("#brac_device_videocapture").attr("disabled", true);   // 视频选择下拉框禁用
		var nret2 = BRAC_StreamRecordCtrl(mSelfUserId, 1, flags, 0);   // 开始录制
		AddLog("nret2=(" + nret2 + ")");
		AddLog("mSelfUserId==(" + mSelfUserId + ") flags==" + flags);
		var times = 0, timeSTR = '', secon = '', minus = '';
		RECOED_TIMEOUT_HAND = setInterval(function() {
			times ++;
			minus = parseInt(times / 60);
			secon = times % 60;
			timeSTR = (minus < 10 ? '0' : '') + minus + ':' + (secon < 10 ? '0' : '') + secon;
			$("#start_video span").text('录制时长：' + timeSTR);
			// 最多限制录制1分钟
			if(times == 60) {
				clearInterval(RECOED_TIMEOUT_HAND);
				RECOED_TIMEOUT_HAND = -1;
				var nret3 = BRAC_StreamRecordCtrl(mSelfUserId, 0, flags, 0);   // 结束录制
				BRAC_LeaveRoom(mSelfUserId);
				$("#start_video, #finish_video").toggle();
				$("#start_video button").text('开始录制');
				$("#start_video span").text('录制时长：00:00');
				$("#AnyChatLocalVideoDiv").html('<div id="finish_record_video" class="wrapper-xl h-lg bg-light"><h2 class="wrapper-xl">视频录制完成</h2></div>');
			}
		}, 1000);
	} else {
		if(RECOED_TIMEOUT_HAND > -1) {
			clearInterval(RECOED_TIMEOUT_HAND);
			RECOED_TIMEOUT_HAND = -1;
			var nret3 = BRAC_StreamRecordCtrl(mSelfUserId, 0, flags, 0);   // 结束录制
			BRAC_LeaveRoom(mSelfUserId);
			$("#start_video, #finish_video").toggle();
			$("#start_video button").text('开始录制');
			$("#start_video span").text('录制时长：00:00');
			$("#AnyChatLocalVideoDiv").html('<div id="finish_record_video" class="wrapper-xl h-lg bg-light"><h2 class="wrapper-xl">视频录制完成</h2></div>');
		}
	}
}

// 单向语音视频播放
function setVideoPlay() {
	$("#finish_record_video").remove();
	$("#AnyChatLocalVideoDiv").html('<embed id="play_record_video" src="public/vendors/bower_components/anychat/src/player.swf" allowfullscreen="true" wmode="transparent" flashvars="controlbar=over&file=' + RECOED_FILE_URL + '&autostart=true" width="417" height="278"/>');
}

function querySessionId(phoneNum, business_id, session_id, user_id, busilogno) {
    var timeCount, nscts, nerrcode;
    $.ajax({
        url: '/wsp/PageInteractionServlet?funcType=12&phoneNum=' + phoneNum + '&media_id=25&extra=2~9999~' + company_id + '~2~' + business_id + "~" + session_id + "~" + user_id + "~" + busilogno,
        data: "",
        type: 'post',
        cache: false,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function(args) {
            nscts = args.result.nscts;
            nerrcode = args.result.nerrcode;
            AddLog(nscts + " " + nerrcode);
            if (nerrcode == 0) {
                AddLog("获取Sessionid失败，nerrcode：" + nerrcode);
                timeCount = setTimeout(function() {
                	querySessionId(phoneNum, business_id, session_id, user_id, busilogno);
                }, 1000);
            }

            if (nerrcode == 9999) {
                if (timeCount != null) clearTimeout(timeCount);
                queryUserId(phoneNum, nerrcode, nscts);
            }
        },
        error: function() {
            timeCount = setTimeout(function() {
            	querySessionId(phoneNum, business_id, session_id, user_id, busilogno);
            }, 1000);
            AddLog("请求sessionid异常！");
        }
    });
}

function queryUserId(phoneNum, nerrcode, nscts) {
    var timeCount;
    $.ajax({
        url: '/wsp/PageInteractionServlet?funcType=12&nscts=' + nscts,
        data: "",
        type: 'post',
        cache: false,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function(args) {
            if (args.result == "-1") {
                AddLog("会话不存在");
                return;
            }

            if (args.result.split(",")[0] == "0") {
                AddLog("还没有转人工成功，在线坐席数：" + args.result.split(",")[1].split("|")[1]);
                timeCount = setTimeout(function() {
                	queryUserId(phoneNum, nerrcode, nscts);
                }, 1000);
                return;
            }

            if (args.result.split(",")[0] == "1") {
                if (timeCount != null) clearTimeout(timeCount);
                mSeatID = args.result.split(",")[1];
                AddProcInfo("获取会话成功，等待编号为" + mSeatID + "的坐席为您服务");
                AddLog("坐席号:" + mSeatID);
                BRAC_Connect(mDefaultServerAddr, mDefaultServerPort); //连接服务器
                BRAC_Login(mUserName, "C|123456", 0);
                
                setTimeout(function() {
                	$("#VideoLoadingDiv, #VideoDiv").toggle();
                }, 1000)
            }
        },
        error: function() {
            AddLog("请求坐席ID异常！");
        }
    });
}

function connectVideoServer(flag) {
	BRAC_Connect(mDefaultServerAddr, mDefaultServerPort); //连接服务器
	BRAC_Login(mUserName, "C|123qwe", 0);
	BRAC_EnterRoom(1, "", 0);
	if (flag) {
		setTimeout(function() {
			BRAC_Logout();
			connectVideoServer();
		}, 1000);
	} else {
		$("#VideoLoadingDiv, #VideoDiv").toggle();
	}
}

function closeVideoServer() {
	if (mRefreshPluginTimer != -1) {
		clearInterval(mRefreshPluginTimer); // 清除插件安装检测定时器
	}
	if (initSDKRetCode == GV_ERR_SUCCESS) {
		// 关闭本地视频
		BRAC_UserCameraControl(mSelfUserId, 0);
		// 关闭本地语音
		BRAC_UserSpeakControl(mSelfUserId, 0);
		// 离开房间
		BRAC_LeaveRoom(mSelfUserId);
		// 注销系统（将关闭网络连接）
		BRAC_Logout();
	}
}

function fillSelectOption(id, theArray) {
    GetID(id).options.length = 0;
    for (var j = 0; j < theArray.length; j++) {
        var option = document.createElement("option");
        GetID(id).appendChild(option);
        option.value = j;
        option.text = theArray[j];
    }
}

function SendMessage() {
    if (GetID("MessageInput").value != "") {
        var Msg = GetID("MessageInput").value;
	var userid = 
        BRAC_SendTextMessage(mTargetUserId, 0, Msg);
		DisplayTextMessage(mSelfUserId, Msg);
		GetID("MessageInput").value = "";
		GetID("MessageInput").focus();
	}
}

function DisplayTextMessage(fromuserid, message) {
	var namestr = BRAC_GetUserName(fromuserid) + "&nbsp" + GetTheTime();
	if(fromuserid == mSelfUserId) {
		namestr = "&nbsp;我";
		namestr = namestr.fontcolor("#008000");
	} else {
		namestr = "&nbsp" + namestr;
		namestr = namestr.fontcolor("#000080");
	}
	message = message.fontcolor("#333333");

	var msgdiv = document.createElement("div");
	msgdiv.setAttribute("class", "TheMsgStyle");
	msgdiv.innerHTML = namestr + "：" + message;
	GetID("ReceiveMsgDiv").appendChild(msgdiv);
}

//添加日志并显示，根据不同的类型显示不同的颜色
function AddLog(message, type) {
	//console.info(message)
}

//显示过程信息
function AddProcInfo(message) {
	$("#procinfo").append($("<div></div>").html(message + "..."));
}
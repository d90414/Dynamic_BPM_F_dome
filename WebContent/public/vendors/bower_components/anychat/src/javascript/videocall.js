// JavaScript Document
var USER_ONLINE_STATUS=1;							// 用户上线
var USER_OFFLINE_STATUS=0;						// 用户下线

var USERINFO_NAME=1;									// 用户昵称信息
var USERINFO_IP=2;										// 用户IP地址信息

function BusyDivOut() {
    $("#SessionPrompt_Div").css("top", "500%");
}

//同意会话
function AcceptRequestBtnClick() {
	BRAC_VideoCallControl(BRAC_VIDEOCALL_EVENT_REPLY,mTargetUserId,0,0,0,"");  
}

//拒绝会话
function RejectRequestBtnClick() {
	BRAC_VideoCallControl(BRAC_VIDEOCALL_EVENT_REPLY,mTargetUserId,GV_ERR_SESSION_REFUSE,0,0,"");  
    AddLog("拒绝对方请求...");
}

//收到视频呼叫请求
function onVideoCallControlRequest(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr)
{
	 var UserName = BRAC_GetUserInfo(dwUserId,USERINFO_NAME); // 用户姓名
	 AddLog("收到用户  " +UserName + "  会话邀请<br />      是否同意?");
	 mTargetUserId = dwUserId;
}

//视频呼叫请求回复
function onVideoCallControlReply(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr)
{
	switch(dwErrorCode)
	{
		case GV_ERR_SUCCESS:
		 // onSendVideoCallRequestSucess(dwUserId);
			break;
		case GV_ERR_SESSION_QUIT:
			AddLog("源用户主动放弃会话");
			break;
		case GV_ERR_SESSION_OFFLINE:
		    AddLog("目标用户不在线");
			break;
		case GV_ERR_SESSION_BUSY:
			AddLog("目标用户忙");
			break; 
		case GV_ERR_SESSION_REFUSE:
		 	AddLog("目标用户拒绝会话");
			break; 
		case GV_ERR_SESSION_TIMEOUT:
		 	AddLog("会话请求超时");
			break; 
		case GV_ERR_SESSION_DISCONNECT:
			AddLog("网络断线");
			break; 
		default:
			break;
	}
}


//通话开始
function onVideoCallControlStart(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr)
{
	 AddLog("onVideoCallControlStart");
   var	nret5 = BRAC_EnterRoom(dwParam, "", 0);
   AddLog("nret5=(" + nret5 + ")");
   
   // 向服务器发送数据,本坐席不可用
   BRAC_TransBuffer(0, "0*"+mTargetUserId+"*1");
   AddLog("send message to server from start succuss!mTargetUserId="+mTargetUserId);
}

//视频通话结束
function onVideoCallControlFinish(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr)
{
	AddLog("onVideoCallControlFinish");
	
	// 关闭本地摄像头
	BRAC_UserCameraControl(-1, 0);
	BRAC_UserSpeakControl(-1, 0);
	       
	// 关闭远程摄像头
	BRAC_UserCameraControl(mTargetUserId, 0);
	BRAC_UserSpeakControl(mTargetUserId, 0);
	
	BRAC_LeaveRoom(-1);
	AddLog("会话结束..."); // 提示层
	if(mRefreshVolumeTimer != -1)
		clearInterval(mRefreshVolumeTimer); // 清除实时音量显示计时器
		
	// 向服务器发送数据,本坐席可用
	BRAC_TransBuffer(0, "1*"+mTargetUserId+"*1");
  
	if(szUserStr=="S"){
  		BRAC_TransBuffer(mTargetUserId, "5100|0");
  	}
  
	AddLog("send message to server from finish succuss!mTargetUserId=" + mTargetUserId);
}




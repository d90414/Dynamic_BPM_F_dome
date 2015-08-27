'use strict';

var myHttp = angular.module('ASS.service.myHttp', [])
    .factory('myHttp', ['$rootScope', '$http', '$state', '$window', '$localStorage', '$q', 'myRoot', 'myAlert', function ($rootScope, $http, $state, $window, $localStorage, $q, myRoot, myAlert) {
        return {
            post: function (param) {
                if ("object" !== $.type(arguments[0])) throw new Error("请求参数不合法，请检查调用参数！");

                var service_id = param.req.service;

                var getReqHead = function (sReq) {
                    return {
                        "OP_WAY": '1',
                        "OP_LANGUAGE": '1',
                        "OP_PROGRAM": '',
                        "SERVER_ID": sReq.service,
                        "MSG_ID": sReq.service,
                        "SESSION_ID": sReq.session_id || $window.sessionStorage.sessionid ? $window.sessionStorage.sessionid : ""
                    };
                };

                var makeJsonRequest = function (req) {
                    var reqJson = [];
                    req = $.isArray(req) ? req : [req];

                    $.each(req, function () {
                        reqJson.push({
                            REQ_MSG_HDR: getReqHead(this),
                            REQ_COMM_DATA: this
                        });
                    });

                    return JSON.stringify({
                        REQUESTS: reqJson
                    });
                };

                var deferred = $q.defer();
                 var kencKey, url = (param.root ? param.root : myRoot) + (param.url || ("kjdp_ajax?returnType=json"));
                //var kencKey, url = "http://localhost/kibh_service/kjdp_ajax?returnType=json";

                param.req = $.isArray(param.req) ? param.req : [param.req];
                param.req.session_id = $window.sessionStorage.sessionid ? $window.sessionStorage.sessionid : "";

                var jsontxt = makeJsonRequest(param.req);
                $http.post(url, $.des.encrypt(jsontxt, kencKey)).then(function (data) {
                    try {
                        data = data.data;
                        var ANSWERS = data.ANSWERS[0];
                        var ANS_MSG_HDR = ANSWERS.ANS_MSG_HDR;
                        var ANS_COMM_DATA = ANSWERS.ANS_COMM_DATA;

                        if (ANS_MSG_HDR.MSG_CODE == 0) {
                            if (service_id == 890015) {
                                var d = ANS_COMM_DATA[0][0];
                                switch (d.CODE) {
                                    case "0":
                                        ANS_COMM_DATA[0][0].BUSI_LOG_NO = d.TEXT;
                                        deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                        break;
                                    case "1":
                                        myAlert(d.TEXT, function () {
                                            $localStorage.loginByFund = true;
                                            $state.go("auth.login");
                                        }, function () {
                                            $localStorage.loginByFund = true;
                                            $state.go("auth.login");
                                        });
                                        break;
                                    case "2":
                                        myAlert(d.TEXT);
                                        break;
                                    case "3":
                                        myAlert("此业务请在" + d.openTime + "时间段内办理!");
                                        break;
                                    case "4":
                                        myAlert(d.TEXT, function () {
                                            $rootScope.beforeProtocolSignUrl = window.location.href;
                                            $state.go("kibh.biz.protocolSign", {businessId: $rootScope.protocolSignId});
                                        }, function () {
                                            $rootScope.beforeProtocolSignUrl = window.location.href;
                                            $state.go("kibh.biz.protocolSign", {businessId: $rootScope.protocolSignId});
                                        });
                                        break;
                                    case "5":
                                        myAlert(d.TEXT, function () {
                                            $state.go("auth.register");
                                        }, function () {
                                            $state.go("auth.register");
                                        });
                                        break;
                                    default:
                                        ANS_COMM_DATA[0][0].BUSI_LOG_NO = d.TEXT;
                                        deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                }
                            } else if (service_id == 860024 || service_id == 860027) {
                                var d = ANS_COMM_DATA[0][0];
                                if (!d) {
                                    deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                } else {
                                    switch (d.CODE) {
                                        case "0":
                                            deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                            break;
                                        case "1":
                                            myAlert(d.TEXT, function () {
                                                $localStorage.loginByFund = true;
                                                $state.go("auth.login");
                                            }, function () {
                                                $localStorage.loginByFund = true;
                                                $state.go("auth.login");
                                            });
                                            break;
                                        case "5":
                                            myAlert(d.TEXT, function () {
                                                $state.go("auth.register");
                                            }, function () {
                                                $state.go("auth.register");
                                            });
                                            break;
                                        default:
                                            deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                    }
                                }
                            } else {
                                deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                            }
                        } else if (ANS_MSG_HDR.MSG_CODE == -2 || ANS_MSG_HDR.MSG_CODE == 10000) {
                            if (!$localStorage.hasLoginAlert) {
                                $localStorage.hasLoginAlert = true;
                                $rootScope.logout();
                                myAlert("您还未登录或会话超时！", function () {
                                    $localStorage.hasLoginAlert = false;
                                    $state.go("auth.login");
                                }, function () {
                                    $localStorage.hasLoginAlert = false;
                                    $state.go("auth.login");
                                });
                            }
                        } else {
                            deferred.resolve([null, null, ANSWERS]);
                            if (ANS_MSG_HDR.MSG_CODE != -130011) {
                                var alertText = ANS_MSG_HDR.MSG_TEXT;
                                if (ANS_MSG_HDR.MSG_TEXT && ANS_MSG_HDR.MSG_TEXT.indexOf("错误信息：") != -1) {
                                    alertText = ANS_MSG_HDR.MSG_TEXT.slice(ANS_MSG_HDR.MSG_TEXT.indexOf("错误信息：") + 5);
                                }
                                $http.get("./data/busierror.json").then(function (result) {
                                    var busierror = "", intererror = "", deferror = "";
                                    if (result.data[service_id]) {
                                        var errorConfig = result.data[service_id];
                                        for (var i = 0; i < errorConfig.length; i++) {
                                            if (errorConfig[i].msg_code == ANS_MSG_HDR.MSG_CODE) {
                                                busierror = errorConfig[i].msg_desc;
                                                intererror = errorConfig[i].msg_text;
                                                break;
                                            } else if (errorConfig[i].msg_code == "default") {
                                                deferror = errorConfig[i].msg_desc;
                                            }
                                        }
                                    }
                                    if (intererror) {
                                        alertText = "【" + service_id + "】" + intererror;
                                    } else {
                                        alertText = "【" + service_id + "】" + alertText;
                                    }
                                    if (busierror) {
                                        //alertText = '<div class="line-dashed b-b m-l-xs"><h3>' + busierror + '</h3></div><div class="m-t-xs">' + alertText + '</div>';
                                        alertText = '<div class="line-dashed b-b m-l-xs"><h3>' + busierror + '</h3></div>';
                                    } else if (deferror) {
                                        //alertText = '<div class="line-dashed b-b m-l-xs"><h3>' + deferror + '</h3></div><div class="m-t-xs">' + alertText + '</div>';
                                        alertText = '<h3>' + deferror + '</h3>';
                                    }
                                    myAlert(alertText);
                                    throw new Error("\n\n\n【功能号】->" + service_id + "\n\n" + ANS_MSG_HDR.MSG_TEXT + "\n\n\n");
                                });
                            }
                        }
                    } catch (e) {
                        throw new Error(e.message);
                    }
                }, function (data) {
                    deferred.reject(data);
                })
                return deferred.promise;
            }
        }
    }]);

module.exports = myHttp;
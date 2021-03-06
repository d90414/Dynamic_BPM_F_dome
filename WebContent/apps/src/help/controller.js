'use strict';

angular.module('ASS.help').controller('HelpCtrl', ['$scope', '$stateParams','$window', 'kibhFile', function ($scope, $stateParams, $window,kibhFile) {
    $scope.setType = function (type) {
    	$scope.type = type;
    	$scope.typelist = [
            {
           	    "0": type == 0 ? true : false
            },
            {
               	"1": type == 1 ? true : false
            },
            {
               	"2": type == 2 ? true : false
            }
        ];
    };
    $scope.setType($stateParams.type);
    $scope.helplist = [
        { question: '系统有哪些登录方式？', id: '1',
            anwser: '有三种，分别是用手机号码登录、用注册用户名登录、用资金账号登录。'},
        { question: '登录页面输入密码时提示安装安全控件，怎么办？', id: '5',
            anwser: "1、未安装控件用户需下载安全控件安装包，再点击安装包，根据引导完成安全控件安装；<br/>2、打开浏览器“Internet选项”，将本系统的地址设置为受信站点，如下图，在Internet选项窗口“安全”页签下点击“可信站点”，点击“站点”，再输入地址，然后点击“添加”按钮，最后点击Internet选项窗口的“应用”按钮<br><img src='public/images/help01.png'/><br>3、浏览器的ActiveX插件都设置成“启用”状态，如下图所示，在Internet选项窗口“安全”页签下分别选择“Internet”和“本地Internet”，点击“自定义级别按钮”，将安全设置窗口下ActiveX插件全部设置成“启用”，然后点击“确定”按钮完成设置。<br> <img src='public/images/help01.png'/><br>4、以上步骤都设置完成后,需要重启浏览器,重启后就可以正常登录了<br><br>"},
        { question: '注册用户时，提示用户名、手机号、邮箱地址已经被使用，怎么办？', id: '2',
            anwser: '说明您使用的用户名、手机号、邮箱地址已经被其他用户注册过了，您需要重新输入未被注册过的用户名、手机号、邮箱地址。'},
        { question: '我只有资金账号，没有注册用户，还需要单独注册吗？不注册可以吗？', id: '3',
            anwser: '您只有资金账户，在我们系统中购买产品是需要绑定注册用户的，若您没有注册用户，可以单独在我们系统中注册一个，然后跟资金账户绑定即可；您也可以直接用资金账户登录，然后输入您的手机号同时进行注册用户的注册和绑定，这样比较简单。'},
        { question: '为什么要安装安全控件？', id: '6',
            anwser: '启用安全控件登录后， 可以防止您输入的密码等数据被木马程序截取，保障您的帐户信息安全。'},
        { question: '安全控件目前支持哪些浏览器？', id: '7',
            anwser: '目前支持Windows系统的如下浏览器：1）IE系列、基于IE内核浏览器：IE8、9、10、11，360，世界之窗等；2）非IE内核浏览器：Firefox、Chrome（42版及42版以上的版本不支持安全控件,需要在确认订单时输入绑定手机验证码）；'},
        { question: '登录成功后，为什么总弹出绑定资金账户的页面？不绑定可以吗？', id: '8',
            anwser: '如果您需要在我们的系统中进行交易，是必须要绑定资金账号的，只有绑定了资金账号，才能关联出您的资金账户信息，才能正常购买产品。'},
        { question: '如何验证手机和邮箱？', id: '9',
            anwser: '用户登录系统成功后，点击页面左上角“个人中心”，在个人中心下点击“安全设置”，分别有“邮箱验证”和“手机号变更”的功能，点击并按提示进行操作即可。'},
        { question: '如何进入账户中心？', id: '10',
            anwser: '用户登录系统成功后，点击页面左上角“个人中心”，即就是账户中心。'},
        { question: '如何找回注册用户密码？', id: '11',
            anwser: '在登录页面点击“忘记密码”，进入密码重置流程，按提示输入对应手机号和验证码，即可重置密码成功。'},
        { question: '如何修改注册用户密码？', id: '12',
            anwser: '用户登录系统成功后，点击页面左上角“个人中心”，在个人中心下点击“安全设置”，在该页面选择“修改密码”，按提示进行操作即可。'},
        { question: '邮箱、手机想修改怎么办？', id: '13',
            anwser: '用户登录系统成功后，点击页面左上角“个人中心”，再选择“个人资料”，在该页面下有“更改绑定手机”和“更改绑定邮箱”的功能，点击并按提示进行操作即可。'},
        { question: '验证邮箱时，提示邮箱已被使用，怎么办？', id: '14',
            anwser: '到这种情况时，说明您需要验证的邮箱已经被他人验证了，请您更换您需要验证的邮箱，谢谢。'},
        { question: '订单提交成功后还可以修改订单信息吗？', id: '15',
            anwser: '很抱歉，订单一旦提交后将无法修改，可以撤销订单。'},
        { question: '除了在首页展示的产品外，如何浏览更多的产品？', id: '16',
            anwser: '点击“网上商城”主菜单进入产品商城，各种产品在该页面有展示。'},
        { question: '为什么我的订单总是无法提交成功？', id: '17',
            anwser: '原因有很多，您可以检查一下您的资金账户保证金余额是否足够，或者检查您绑定的银行卡余额是否足够。'},
        { question: '在加入购物车后，是不是该商品已经被我预定了？', id: '18',
            anwser: '并不是，如果您想订购该商品，请把该商品加入购物车后进行结算。'},
        { question: '我可以重复购买产品吗？重复购买的结果是什么?', id: '19',
            anwser: '根据产品特点，部分产品是可以重复购买的。同一产品多次购买后将会在原有产品数量上进行自动叠加。'},
        { question: '对产品进行收藏时，为什么总提示要先登录？', id: '20',
            anwser: '只有先登录了才能把您所收藏的的产品加入到您的账户收藏夹中去，更方便您购买。'},
        { question: '我已经登录成功了，选择了产品，点击购买时，为什么会跳转到要绑定资金账户的页面？', id: '21',
            anwser: '这是因为您的注册用户没有跟资金账户绑定，所以您需要在弹出的绑定资金账户的页面对您的注册用户和资金账户进行绑定后，方可继续购买，谢谢！'},
        { question: '购买产品时，为什么提示我没有开通OTC权限？', id: '22',
            anwser: '因为您购买的是OTC的产品，购买OTC的产品需要对您的账户开通OTC业务权限，所以您需要根据提示先开通OTC业务权限。'},
        { question: '购买产品过程中，系统提示我的风险测评已经过期，怎么办？', id: '23',
            anwser: '当您的风险评测已经过期，页面会提示您重新进行评测，请根据提示填写调查问题重新评测，评测完后即可继续购买产品。'},
        { question: '购买产品时，系统提示我产品适当性不匹配，这是什么意思？要怎么操作？', id: '24',
            anwser: '提示您产品适当性不匹配，是说您能承受的风险等级小于产品的风险等级，如果该产品不支持强制购买的话，您需要重新进行风险评测，或者重新选择跟您能承受的风险等级匹配的产品；若该产品支持强制购买，您可以直接点击强制购买，然后签订风险揭示书后可以继续购买该产品。'}
    ];
    $scope.business_url = kibhFile + "user_manual/user_manual.html";

    var hash = window.location.hash; //获取链接过来的锚点值，#test
    //window.location.hash = window.location.hash;
     //window.location = window.location;
    var hs = hash.split("#");; //去掉#
    //document.getElementById(hs[2]).scrollTop();
   //window.location.hash =hs[2];

    //var t = document.getElementById(hs[2]).offset().top;

    //$(window).scrollTop(t);






    //document.getElementById(hs[2]).scrollIntoView(true);//
}]);

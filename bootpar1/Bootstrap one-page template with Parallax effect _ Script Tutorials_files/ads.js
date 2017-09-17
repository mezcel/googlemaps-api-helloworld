jQuery(function($){
  var js = '\
<style>\
  #bsaHolder{right: 25px;position: fixed;bottom: 25px;min-width: 180px;z-index: 10;}\
  #bsaHolder span{text-shadow:1px 1px 0 #fff;}\
  #bsap_aplink,\
  #bsap_aplink:visited{bottom: 10px;color: #aaa;font: 11px arial, sans-serif;position: absolute;right: 14px;border:none;}\
  #bsaHolder .bsa_it_p{display:none;}\
  #bsaHolder{background: -moz-linear-gradient(#F3F3F3, #FFFFFF, #F3F3F3) repeat scroll 0 0 transparent; background: -webkit-gradient(linear,0% 0%,0% 100%,color-stop(0, #f3f3f3),color-stop(0.5, #fff),color-stop(1, #f3f3f3)); background-color:#f4f4f4;\
              border-color: #fff;overflow: hidden;padding: 10px;box-shadow: 0 0 2px #999;border-radius: 2px;}\
  #bsaHolder img{display:block;border:none;}\
  #bsa_closeAd{width:15px;height:15px;overflow:hidden;position:absolute;top:10px;right:11px;border:none !important;z-index:1;\
              text-decoration:none !important;background:url("https://www.script-tutorials.com/assets/close_icon.png") no-repeat;}\
  #bsa_closeAd:hover{background-position:left bottom;}\
</style>\
<script type="text/javascript">\
(function(){\
  var bsa = document.createElement("script");\
     bsa.type = "text/javascript";\
     bsa.async = true;\
     bsa.src = "https://s3.buysellads.com/ac/bsa.js";\
  (document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(bsa);\
})();\
</script>\
<div id="bsaHolder" class="bbsa">\
<a id="bsa_closeAd" href="" title="Hide this ad!"></a>\
<div id="bsap_1300302" class="bsarocks bsap_b3aa54b8b4711892fe59f3c4427b7387"></div>\
</div>\
<script type="text/javascript">\
_atrk_opts = { atrk_acct:"C7eGl1aYizr05T", domain:"script-tutorials.com",dynamic: true};\
(function() { var as = document.createElement("script"); as.type = "text/javascript"; as.async = true; as.src = "https://d31qbv1cthcecs.cloudfront.net/rk.js"; var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(as, s); })();\
</script>\
<noscript><img src="https://d5nxst8fruw4z.cloudfront.net/atrk.gif?account=C7eGl1aYizr05T" style="display:none" height="1" width="1" alt="" /></noscript>\
';
  $('body').prepend(js);

  $('#bsa_closeAd').click(function(){
    $(this).parent().remove();
    return false;
  });
});
google.maps.__gjsload__('stats', function(_){var G_=function(){this.b=new _.Bl},H_=function(a){var b=0,c=0;a.b.forEach(function(a){b+=a.Ho;c+=a.eo});return c?b/c:0},I_=function(a,b,c){var d=[];_.gb(a,function(a,c){d.push(c+b+a)});return d.join(c)},J_=function(a){var b={};_.gb(a,function(a,d){b[(0,window.encodeURIComponent)(d)]=(0,window.encodeURIComponent)(a).replace(/%7C/g,"|")});return I_(b,":",",")},K_=function(a,b,c){this.l=b;this.f=a+"/maps/gen_204";this.j=c},L_=function(a,b,c,d){var e={};e.host=window.document.location&&window.document.location.host||
window.location.host;e.v=a;e.r=Math.round(1/b);c&&(e.client=c);d&&(e.key=d);return e},M_=function(a,b,c,d,e){this.m=a;this.C=b;this.l=c;this.f=d;this.j=e;this.b=new _.Bl;this.B=_.Ua()},O_=function(a,b,c,d,e){var f=_.N(_.R,23,500);var g=_.N(_.R,22,2);this.D=a;this.G=b;this.F=f;this.l=g;this.C=c;this.m=d;this.B=e;this.f=new _.Bl;this.b=0;this.j=_.Ua();N_(this)},N_=function(a){window.setTimeout(function(){P_(a);N_(a)},Math.min(a.F*Math.pow(a.l,a.b),2147483647))},Q_=function(a,b,c){a.f.set(b,c)},P_=function(a){var b=
L_(a.G,a.C,a.m,a.B);b.t=a.b+"-"+(_.Ua()-a.j);a.f.forEach(function(a,d){a=a();0<a&&(b[d]=Number(a.toFixed(2))+(_.Cm()?"-if":""))});a.D.b({ev:"api_snap"},b);++a.b},R_=function(a,b,c,d,e){this.B=a;this.C=b;this.m=c;this.j=d;this.l=e;this.f={};this.b=[]},S_=function(a,b,c,d){this.j=a;_.G.bind(this.j,"set_at",this,this.l);_.G.bind(this.j,"insert_at",this,this.l);this.B=b;this.C=c;this.m=d;this.f=0;this.b={};this.l()},T_=function(){this.j=_.O(_.R,6);this.C=_.zf();this.b=new K_(_.xg[35]?_.O(_.Af(_.R),11):
_.pw,_.mj,window.document);new S_(_.$i,(0,_.p)(this.b.b,this.b),_.Ff,!!this.j);var a=_.O(new _.tf(_.R.data[3]),1);this.D=a.split(".")[1]||a;this.G={};this.B={};this.m={};this.F={};this.fa=_.N(_.R,0,1);_.lj&&(this.l=new O_(this.b,this.D,this.fa,this.j,this.C))};G_.prototype.f=function(a,b,c){this.b.set(_.Yc(a),{Ho:b,eo:c})};
K_.prototype.b=function(a,b){b=b||{};var c=_.ik().toString(36);b.src="apiv3";b.token=this.l;b.ts=c.substr(c.length-6);a.cad=J_(b);a=I_(a,"=","&");a=this.f+"?target=api&"+a;this.j.createElement("img").src=a;(b=_.pb.__gm_captureCSI)&&b(a)};
M_.prototype.D=function(a,b){b=_.m(b)?b:1;this.b.isEmpty()&&window.setTimeout((0,_.p)(function(){var a=L_(this.C,this.l,this.f,this.j);a.t=_.Ua()-this.B;var b=this.b;_.Cl(b);for(var e={},f=0;f<b.b.length;f++){var g=b.b[f];e[g]=b.H[g]}_.Iz(a,e);this.b.clear();this.m.b({ev:"api_maprft"},a)},this),500);b=this.b.get(a,0)+b;this.b.set(a,b)};R_.prototype.D=function(a){this.f[a]||(this.f[a]=!0,this.b.push(a),2>this.b.length&&_.dA(this,this.G,500))};
R_.prototype.G=function(){for(var a=L_(this.C,this.m,this.j,this.l),b=0,c;c=this.b[b];++b)a[c]="1";a.hybrid=+_.gm();this.b.length=0;this.B.b({ev:"api_mapft"},a)};S_.prototype.l=function(){for(var a;a=this.j.removeAt(0);){var b=a.In;a=a.timestamp-this.C;++this.f;this.b[b]||(this.b[b]=0);++this.b[b];if(20<=this.f&&!(this.f%5)){var c={};c.s=b;c.sr=this.b[b];c.tr=this.f;c.te=a;c.hc=this.m?"1":"0";this.B({ev:"api_services"},c)}}};T_.prototype.T=function(a){a=_.Yc(a);this.G[a]||(this.G[a]=new R_(this.b,this.D,this.fa,this.j,this.C));return this.G[a]};T_.prototype.S=function(a){a=_.Yc(a);this.B[a]||(this.B[a]=new M_(this.b,this.D,_.N(_.R,0,1),this.j,this.C));return this.B[a]};T_.prototype.f=function(a){if(this.l){this.m[a]||(this.m[a]=new _.WA,Q_(this.l,a,function(){return b.Ya()}));var b=this.m[a];return b}};
T_.prototype.N=function(a){if(this.l){this.F[a]||(this.F[a]=new G_,Q_(this.l,a,function(){return H_(b)}));var b=this.F[a];return b}};var U_=new T_;_.ke("stats",U_);});
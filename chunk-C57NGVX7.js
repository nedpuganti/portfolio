import{h as k}from"./chunk-HDBVCKQ5.js";import{a as S}from"./chunk-JYHFIQTA.js";import{a as f}from"./chunk-FNZNNXA5.js";import{$a as _,Ba as p,Ea as y,Ka as c,N as d,Na as I,Oa as g,Pa as E,Qa as C,Ra as e,Sa as t,Ta as l,Wa as h,Za as n,_a as m,ab as P,bb as D,cb as L,db as N,oa as b,pa as x,sa as r}from"./chunk-2ROVDL6K.js";var T=()=>["/contact"];function $(o,s){if(o&1&&(e(0,"div",0)(1,"h5"),n(2,"Personal Info"),t(),e(3,"div",1),l(4,"div",2),e(5,"div",3),l(6,"p",4),t(),e(7,"div",5)(8,"ul")(9,"li")(10,"span",6),l(11,"i",7),e(12,"span"),n(13,"First Name"),t()(),e(14,"span",8),n(15,"-"),t(),e(16,"span",9),n(17),t()(),e(18,"li")(19,"span",6),l(20,"i",7),e(21,"span"),n(22,"Last Name"),t()(),e(23,"span",8),n(24,"-"),t(),e(25,"span",9),n(26),t()(),e(27,"li")(28,"span",6),l(29,"i",7),e(30,"span"),n(31,"Date of Birth"),t()(),e(32,"span",8),n(33,"-"),t(),e(34,"span",9),n(35),t()(),e(36,"li")(37,"span",6),l(38,"i",7),e(39,"span"),n(40,"Nationality"),t()(),e(41,"span",8),n(42,"-"),t(),e(43,"span",9),n(44),t()()()(),e(45,"div",5)(46,"ul")(47,"li")(48,"span",6),l(49,"i",7),e(50,"span"),n(51,"Phone"),t()(),e(52,"span",8),n(53,"-"),t(),e(54,"span",9),n(55),t()(),e(56,"li")(57,"span",6),l(58,"i",7),e(59,"span"),n(60,"Email"),t()(),e(61,"span",8),n(62,"-"),t(),e(63,"span",9),n(64),t()(),e(65,"li")(66,"span",6),l(67,"i",7),e(68,"span"),n(69,"Address"),t()(),e(70,"span",8),n(71,"-"),t(),e(72,"span",9),n(73),t()(),e(74,"li")(75,"span",6),l(76,"i",7),e(77,"span"),n(78,"Languages"),t()(),e(79,"span",8),n(80,"-"),t(),e(81,"span",9),n(82),t()()()(),e(83,"div",10)(84,"ul")(85,"li")(86,"a",11)(87,"span",12),l(88,"i",13),t(),e(89,"span",14),l(90,"i",13),t()()()()(),e(91,"div",15)(92,"div",16)(93,"a",11)(94,"span",12),l(95,"i",17),e(96,"span",9),n(97,"Download "),e(98,"span"),n(99,"CV"),t()()(),e(100,"span",14),l(101,"i",17),e(102,"span",9),n(103,"Download "),e(104,"span"),n(105,"CV"),t()()()()(),e(106,"div",18)(107,"a",19)(108,"span",12),l(109,"i",20),e(110,"span",9),n(111,"Contact "),e(112,"span"),n(113,"Me"),t()()(),e(114,"span",14),l(115,"i",20),e(116,"span",9),n(117,"Contact "),e(118,"span"),n(119,"Me"),t()()()()()()()()),o&2){let a=h(),i=L(0);r(6),c("innerHtml",i==null?null:i.summary,b),r(11),m(i==null?null:i.firstName),r(9),m(i==null?null:i.lastName),r(9),m(i==null?null:i.dob),r(9),m(i==null?null:i.nationality),r(11),_("+1 ",i.phoneNumber,""),r(9),m(i==null?null:i.email),r(9),m(i==null?null:i.address),r(9),m(i==null?null:i.languages),r(4),c("href",a.githubLink,x),r(7),c("href",a.cvLink,x),r(14),c("routerLink",N(12,T))}}var u=class o{registerService=d(S);personalInfo$=f(this.registerService.getPersonalInfo());cvLink="#";githubLink="https://github.com/nedpuganti";static \u0275fac=function(a){return new(a||o)};static \u0275cmp=p({type:o,selectors:[["pfo-personalinfo"]],decls:2,vars:2,consts:[["id","personal-info"],[1,"row","no-gutters"],[1,"profile-picture","col-md-2","col-sm-3","col-12"],[1,"summary","col-md-10","col-sm-9","col-12"],[3,"innerHtml"],[1,"profile","col-12","col-sm-6"],[1,"label"],[1,"fas","fa-angle-double-right"],[1,"dash"],[1,"value"],[1,"social-media","col-12"],["target","_blank",3,"href"],[1,"front"],[1,"fab","fa-github"],[1,"back"],[1,"button-wrapper","col-12"],[1,"single-button"],[1,"fas","fa-file-pdf"],["id","contact-me",1,"single-button"],["id","contact-button",3,"routerLink"],[1,"fas","fa-envelope"]],template:function(a,i){if(a&1&&(P(0),y(1,$,120,13,"div",0)),a&2){let M=D(i.personalInfo$());r(),I(M?1:-1)}},dependencies:[k],encapsulation:2})};function z(o,s){if(o&1&&(e(0,"p",9),n(1),t()),o&2){let a=s.$implicit;r(),m(a)}}function B(o,s){if(o&1&&(e(0,"div",2)(1,"ul")(2,"li",3)(3,"span",4),n(4,"Service "),t(),e(5,"span",5),n(6),t()(),e(7,"li")(8,"ul")(9,"li",6),l(10,"i",7),e(11,"span"),n(12),t()(),e(13,"li",8),E(14,z,2,1,"p",9,g),t()()()()()),o&2){let a=s.$implicit,i=s.$index;r(6),m(i+1),r(6),m(a.name),r(2),C(a.types)}}var v=class o{registerService=d(S);services$=f(this.registerService.getServices(),{initialValue:[]});static \u0275fac=function(a){return new(a||o)};static \u0275cmp=p({type:o,selectors:[["pfo-services"]],decls:6,vars:0,consts:[["id","services"],[1,"row","no-gutters"],[1,"single-service","col-sm-6","col-12"],[1,"service-number"],[1,"first-word"],[1,"second-word"],[1,"service-name"],[1,"fas","fa-angle-double-right"],[1,"service-body"],[1,"mb-0"]],template:function(a,i){a&1&&(e(0,"div",0)(1,"h5"),n(2,"Services"),t(),e(3,"div",1),E(4,B,16,2,"div",2,g),t()()),a&2&&(r(4),C(i.services$()))},encapsulation:2})};var F=class o{static \u0275fac=function(a){return new(a||o)};static \u0275cmp=p({type:o,selectors:[["pfo-about"]],decls:2,vars:0,template:function(a,i){a&1&&l(0,"pfo-personalinfo")(1,"pfo-services")},dependencies:[u,v],encapsulation:2})};export{F as AboutComponent};

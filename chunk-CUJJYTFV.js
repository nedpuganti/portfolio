import{a as g}from"./chunk-JBQQTFXU.js";import{a as S}from"./chunk-NASWEI2H.js";import{Ka as k,La as y,Na as d,O as v,Oa as f,Pa as u,Qa as e,Ra as i,Sa as r,Ya as n,Za as c,_a as s,db as F,na as x,ra as l,ya as p}from"./chunk-KGTUC6WS.js";function D(a,o){if(a&1&&(e(0,"div",2)(1,"ul")(2,"li",3)(3,"span",4),n(4),i(),e(5,"span",5),n(6),i()(),e(7,"li")(8,"ul")(9,"li",6),r(10,"i",7),e(11,"span"),n(12),i(),r(13,"br"),n(14),i(),e(15,"li",8)(16,"a",9),n(17),i()()()()()()),a&2){let t=o.$implicit;l(4),s("",t.when," "),l(2),c(t.where),l(6),c(t.name),l(2),s(" ",t.subName," "),l(2),k("href",t.url,x),l(),s(" ",t.description," ")}}var E=class a{registerService=v(g);educations$=S(this.registerService.getEducations(),{initialValue:[]});static \u0275fac=function(t){return new(t||a)};static \u0275cmp=p({type:a,selectors:[["pfo-education"]],decls:6,vars:0,consts:[[1,"education"],[1,"row","no-gutters"],[1,"single-education","col-sm-6","col-12"],[1,"education-when-where"],[1,"when"],[1,"where"],[1,"education-name"],[1,"fas","fa-angle-double-right"],[1,"education-body"],["target","_blank",2,"color","#a8a8a8",3,"href"]],template:function(t,m){t&1&&(e(0,"div",0)(1,"h5"),n(2,"Education"),i(),e(3,"div",1),f(4,D,18,6,"div",2,d),i()()),t&2&&(l(4),u(m.educations$()))},encapsulation:2})};function T(a,o){if(a&1&&(e(0,"div",2)(1,"ul")(2,"li",3),r(3,"i",4),i(),e(4,"li",5),n(5),i(),e(6,"li",6),r(7,"i",7),e(8,"span"),n(9),i()()()()),a&2){let t=o.$implicit;l(5),s("",t.value,"+"),l(4),c(t.name)}}var C=class a{registerService=v(g);funFacts$=S(this.registerService.getFunFacts(),{initialValue:[]});static \u0275fac=function(t){return new(t||a)};static \u0275cmp=p({type:a,selectors:[["pfo-funfacts"]],decls:6,vars:0,consts:[[1,"fun-facts"],[1,"row","no-gutters"],[1,"single-fun-fact","col-12","col-sm-4"],[1,"fun-fact-icon"],[1,"fas","fa-business-time","fa-3x"],[1,"fun-fact-value"],[1,"fun-fact-body"],[1,"fas","fa-angle-double-right"]],template:function(t,m){t&1&&(e(0,"div",0)(1,"h5"),n(2,"Fun Facts"),i(),e(3,"div",1),f(4,T,10,2,"div",2,d),i()()),t&2&&(l(4),u(m.funFacts$()))},encapsulation:2})};var I=a=>({width:a});function $(a,o){if(a&1&&(e(0,"li",6)(1,"ul")(2,"li",7),r(3,"i",8),e(4,"span"),n(5),i()(),e(6,"li",9),n(7),i(),e(8,"li")(9,"div",10),r(10,"div",11),i()()()()),a&2){let t=o.$implicit;l(5),c(t.name),l(2),s("",t.progress,"%"),l(3),y(F(4,I,t.progress+"%"))}}function M(a,o){if(a&1&&(e(0,"li",6)(1,"ul")(2,"li",7),r(3,"i",8),e(4,"span"),n(5),i()(),e(6,"li",9),n(7),i(),e(8,"li")(9,"div",10),r(10,"div",11),i()()()()),a&2){let t=o.$implicit;l(5),c(t.name),l(2),s("",t.progress,"%"),l(3),y(F(4,I,t.progress+"%"))}}var h=class a{registerService=v(g);hardSkills$=S(this.registerService.getHardSkills(),{initialValue:[]});softSkills$=S(this.registerService.getSoftSkills(),{initialValue:[]});static \u0275fac=function(t){return new(t||a)};static \u0275cmp=p({type:a,selectors:[["pfo-skills"]],decls:26,vars:0,consts:[[1,"skills"],[1,"row","no-gutters"],[1,"single-skills-wrapper","col-12","col-sm-6"],[1,"skills-heading"],[1,"first-word"],[1,"second-word"],[1,"single-skill"],[1,"skill-name"],[1,"fas","fa-angle-double-right"],[1,"percentage"],[1,"progress",2,"height","40px"],[1,"progress-bar","progress-bar","progress-bar-striped","progress-bar-animated"]],template:function(t,m){t&1&&(e(0,"div",0)(1,"h5"),n(2,"Skills"),i(),e(3,"div",1)(4,"div",2)(5,"ul")(6,"li",3)(7,"span",4),n(8,"Soft "),i(),e(9,"span",5),n(10,"Skills"),i()(),e(11,"li")(12,"ul"),f(13,$,11,6,"li",6,d),i()()()(),e(15,"div",2)(16,"ul")(17,"li",3)(18,"span",4),n(19,"Hard "),i(),e(20,"span",5),n(21,"Skills"),i()(),e(22,"li")(23,"ul"),f(24,M,11,6,"li",6,d),i()()()()()()),t&2&&(l(13),u(m.softSkills$()),l(11),u(m.hardSkills$()))},encapsulation:2})};var _=class a{resumeLink="#";static \u0275fac=function(t){return new(t||a)};static \u0275cmp=p({type:a,selectors:[["pfo-resume"]],decls:17,vars:1,consts:[[1,"button-wrapper"],["target","_blank",3,"href"],[1,"front"],[1,"fas","fa-file-pdf"],[1,"value"],[1,"back"]],template:function(t,m){t&1&&(r(0,"pfo-skills")(1,"pfo-education")(2,"pfo-funfacts"),e(3,"div",0)(4,"a",1)(5,"span",2),r(6,"i",3),e(7,"span",4),n(8,"Download "),e(9,"span"),n(10,"Resume"),i()()(),e(11,"span",5),r(12,"i",3),e(13,"span",4),n(14,"Download "),e(15,"span"),n(16,"Resume"),i()()()()()),t&2&&(l(4),k("href",m.resumeLink,x))},dependencies:[h,E,C],encapsulation:2})};export{_ as ResumeComponent};
import{b as A,c as B,d as T,e as w,f as M}from"./chunk-SV7SSY54.js";import{j as k,k as W}from"./chunk-44WOYNBD.js";import{a as N}from"./chunk-NASWEI2H.js";import{$a as b,E as C,Ga as s,H as R,Ia as D,Ka as g,Ma as E,O as u,Qa as i,Ra as a,Sa as c,Va as L,Ya as r,Za as v,_a as f,cb as _,eb as l,fb as p,o as m,q as x,ra as n,t as y,x as S,ya as I}from"./chunk-KGTUC6WS.js";var F=()=>["/home"];function O(o,t){if(o&1&&(b(0)(1),i(2,"div",0)(3,"a",1),c(4,"i",2),a(),i(5,"div",3)(6,"div",4),c(7,"i",5),a(),i(8,"div",6)(9,"div",7)(10,"h6"),r(11),l(12,"uppercase"),i(13,"span"),r(14),l(15,"uppercase"),a()()()()(),i(16,"div",8)(17,"div",9)(18,"h3"),r(19),l(20,"titlecase"),i(21,"span"),r(22),l(23,"titlecase"),a()()(),i(24,"div",10),c(25,"router-outlet"),a()()()),o&2){let e=L(),d=e.title1(),h=e.title2();n(2),g("id",e.pageId()),n(),g("routerLink",_(14,F)),n(8),f(" ",p(12,6,d)," "),n(3),v(p(15,8,h)),n(5),f(" ",p(20,10,d)," "),n(3),v(p(23,12,h))}}var P=class o{router=u(w);activatedRoute=u(B);title1=s("");title2=s("");pageId=s("");readRouteData=N(this.router.events.pipe(y(t=>t instanceof A),C(this.router),m(()=>this.activatedRoute),m(t=>t.firstChild),x(t=>t.data),S(1),R(t=>{if(t){this.pageId.update(()=>t.pageId);let e=t.title.split(" ");this.title1.set(e?.[0]),this.title2.set(e?.[1])}})));static \u0275fac=function(e){return new(e||o)};static \u0275cmp=I({type:o,selectors:[["pfo-detail-layout"]],decls:1,vars:1,consts:[[1,"main-content","active",3,"id"],[1,"close-menu-link",3,"routerLink"],[1,"close-button","fas","fa-times-circle","fa-2x"],[1,"hanging"],[1,"logo-hanging"],[1,"fas","fa-id-card"],[1,"text-hanging"],[1,"word"],[1,"inner-content"],[1,"head-content"],[1,"content"]],template:function(e,d){e&1&&D(0,O,26,15,"div",0),e&2&&E(d.pageId()?0:-1)},dependencies:[T,M,k,W],encapsulation:2})};export{P as DetailLayoutComponent};
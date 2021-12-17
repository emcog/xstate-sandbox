import{C as M,J as X,K as Z,S as D,i as I,s as L,e as v,t as O,k as A,c as _,a as P,g as T,d,n as E,b as m,f as g,H as y,L as G,h as F,I as b,M as ee,N as C,j as H,m as N,o as R,x as V,u as k,v as x}from"../chunks/vendor-1196987c.js";const B=M(0),U=M(0),te=n=>{n.releaseCount+=1,console.log(n)},ne=n=>{n.pressCount+=1,console.log(n)},se=X({id:"pressHoldRelease",context:{runningCounter:0,pressCount:0,releaseCount:0,timer:!1},initial:"inactive",states:{inactive:{on:{TOGGLE:{target:"press"}}},press:{entry:ne,invoke:{id:"incInterval",src:()=>(n,e)=>{function s(){console.log("running counter"),requestAnimationFrame(s)}s()}},on:{TOGGLE:{target:"release"},LOOP:{}}},release:{entry:te,on:{TOGGLE:{target:"press"},MINCOUNT:{target:"idle"}}},idle:{on:{},after:{}}}}),j=Z(se).start();function re(n){let e,s=(n[0].value==="inactive"?"Released":"Pressing")+"",r,t,a,l=n[0].context.runningCounter+"",u,i,c,h=n[0].state+"",$,f,q,w=n[0].value+"",S,z,J;return{c(){e=v("button"),r=O(s),t=A(),a=v("span"),u=O(l),i=A(),c=v("span"),$=O(h),f=A(),q=v("span"),S=O(w),this.h()},l(o){e=_(o,"BUTTON",{id:!0,class:!0});var p=P(e);r=T(p,s),p.forEach(d),t=E(o),a=_(o,"SPAN",{});var K=P(a);u=T(K,l),K.forEach(d),i=E(o),c=_(o,"SPAN",{});var Y=P(c);$=T(Y,h),Y.forEach(d),f=E(o),q=_(o,"SPAN",{});var W=P(q);S=T(W,w),W.forEach(d),this.h()},h(){m(e,"id","press-hold-button"),m(e,"class","svelte-qchzdf")},m(o,p){g(o,e,p),y(e,r),g(o,t,p),g(o,a,p),y(a,u),g(o,i,p),g(o,c,p),y(c,$),g(o,f,p),g(o,q,p),y(q,S),z||(J=[G(e,"mousedown",n[2]),G(e,"touchstart",n[2],{passive:!0}),G(e,"mouseup",n[1]),G(e,"touchend",n[1],{passive:!0})],z=!0)},p(o,[p]){p&1&&s!==(s=(o[0].value==="inactive"?"Released":"Pressing")+"")&&F(r,s),p&1&&l!==(l=o[0].context.runningCounter+"")&&F(u,l),p&1&&h!==(h=o[0].state+"")&&F($,h),p&1&&w!==(w=o[0].value+"")&&F(S,w)},i:b,o:b,d(o){o&&d(e),o&&d(t),o&&d(a),o&&d(i),o&&d(c),o&&d(f),o&&d(q),z=!1,ee(J)}}}function ie(n,e,s){let r,t;C(n,B,u=>s(3,r=u)),C(n,j,u=>s(0,t=u)),console.log("bannas in press hold button");function a(){B.update(u=>u+1),console.log("handlePhabButtonUp \u2013 oddsEqualActivePress",r%2),j.send("TOGGLE")}function l(){B.update(u=>u+1),console.log("handlePhabButtonDown \u2013 oddsEqualActivePress",r%2),j.send("TOGGLE")}return[t,a,l]}class ae extends D{constructor(e){super();I(this,e,ie,re,L,{})}}function oe(n){let e,s,r;return{c(){e=v("div"),s=A(),r=v("div"),this.h()},l(t){e=_(t,"DIV",{id:!0,"data-sizing":!0,class:!0}),P(e).forEach(d),s=E(t),r=_(t,"DIV",{id:!0,class:!0}),P(r).forEach(d),this.h()},h(){m(e,"id","feedback-circle"),m(e,"data-sizing","px"),m(e,"class","svelte-1awk1"),m(r,"id","signifier__circle-outline"),m(r,"class","on-boarding-wrapper svelte-1awk1")},m(t,a){g(t,e,a),g(t,s,a),g(t,r,a)},p:b,i:b,o:b,d(t){t&&d(e),t&&d(s),t&&d(r)}}}class le extends D{constructor(e){super();I(this,e,null,oe,L,{})}}const Q=M({skipped:!1,passedAll:!1,steps:[{instruction:"Press and hold the button",requiredCounterValue:50,THISBOUND:function(){return"this is a string"},passed:!1,get interrupted(){Q.steps[0].instruction},node:void 0},{instruction:"Keep going",requiredCounterValue:100,passed:!1,get interrupted(){phabOnboardingState.progressInterrupted.tryPressingLonger.instruction},node:void 0},{instruction:"That is great",requiredCounterValue:200,passed:!1,get interrupted(){tryPressingLonger.instruction},node:void 0},{instruction:"Now release and wait",requiredCounterValue:400,passed:!1,get interrupted(){dontPressJustYet.instruction},node:void 0},{instruction:"Wait a little longer",requiredDuration:200,passed:!1,get interrupted(){tryPressingLonger.instruction},node:void 0},{instruction:"Now",requiredDuration:40,passed:!1,node:void 0},{instruction:"Press hold and breathe",requiredDuration:10,passed:!1,get interrupted(){tryPressingLonger.instruction},node:void 0}],progressInterrupted:{tryPressingLonger:{passed:!1,get progress(){keepingGoing.instruction},node:void 0,instruction:"Try pressing lgutonger"},dontPressJustYet:{requiredDuration:700,passed:!1,get progress(){waitALittleLonger.instruction},get interrupted(){releaseTheButton.instruction},node:void 0,instruction:"dpjy"},releaseTheButton:{requiredDuration:700,passed:!1,get progress(){waitALittleLonger.instruction},get interrupted(){letsStartAgain},node:void 0,instruction:"rtb"},letsStartAgain:{requiredDuration:700,passed:!1,get progress(){pressAndHoldTheButton.instruction},node:void 0,instruction:"lsa"}}});function ue(n,e,s){let r,t,a;C(n,U,i=>s(0,r=i)),C(n,Q,i=>s(3,t=i)),C(n,B,i=>s(1,a=i));let l=t.steps[0];function u(){l=t.steps.find(i=>!i.passed),console.log(l.instruction,l.requiredCounterValue,r),l.requiredCounterValue<=r&&(l.passed=!0)}return n.$$.update=()=>{n.$$.dirty&3&&a>0&&r>0&&u()},[r,a]}class de extends D{constructor(e){super();I(this,e,ue,null,L,{})}}function ce(n){let e,s,r,t,a,l,u;return s=new le({}),t=new ae({}),t.$on("phabButtonIsUp",n[1]),t.$on("phabButtonIsDown",n[0]),l=new de({}),{c(){e=v("div"),H(s.$$.fragment),r=A(),H(t.$$.fragment),a=A(),H(l.$$.fragment),this.h()},l(i){e=_(i,"DIV",{class:!0});var c=P(e);N(s.$$.fragment,c),r=E(c),N(t.$$.fragment,c),a=E(c),N(l.$$.fragment,c),c.forEach(d),this.h()},h(){m(e,"class","svelte-d14dp7")},m(i,c){g(i,e,c),R(s,e,null),y(e,r),R(t,e,null),y(e,a),R(l,e,null),u=!0},p:b,i(i){u||(V(s.$$.fragment,i),V(t.$$.fragment,i),V(l.$$.fragment,i),u=!0)},o(i){k(s.$$.fragment,i),k(t.$$.fragment,i),k(l.$$.fragment,i),u=!1},d(i){i&&d(e),x(s),x(t),x(l)}}}function pe(n,e,s){let r,t;C(n,B,f=>s(2,r=f)),C(n,U,f=>s(6,t=f));let a,l;function u(){const f="px";document.documentElement.style.setProperty("--size",t+f)}function i(){cancelAnimationFrame(l),h()}function c(){cancelAnimationFrame(a),$()}function h(){U.update(f=>f+1.15),a=requestAnimationFrame(h),u()}function $(){l=requestAnimationFrame($),U.update(f=>f-.9),t<=1&&cancelAnimationFrame(l),u()}return n.$$.update=()=>{n.$$.dirty&4&&r>0&&(r%2==1?i():c())},[i,c,r]}class fe extends D{constructor(e){super();I(this,e,pe,ce,L,{})}}function ge(n){let e,s,r;return s=new fe({}),{c(){e=v("div"),H(s.$$.fragment),this.h()},l(t){e=_(t,"DIV",{class:!0});var a=P(e);N(s.$$.fragment,a),a.forEach(d),this.h()},h(){m(e,"class","gradient-bg fill-the-view svelte-1vmdhhq")},m(t,a){g(t,e,a),R(s,e,null),r=!0},p:b,i(t){r||(V(s.$$.fragment,t),r=!0)},o(t){k(s.$$.fragment,t),r=!1},d(t){t&&d(e),x(s)}}}class he extends D{constructor(e){super();I(this,e,null,ge,L,{})}}export{he as default};
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(25)},18:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(5),i=a.n(l),s=(a(18),a(10)),c=a(6),u=a(7),o=a(12),m=a(11),d=a(9),h=a(8),p=(a(24),function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={player:"X",squares:Array(9).fill(""),gameOver:!1},n}return Object(u.a)(a,[{key:"gameUpdate",value:function(){var e=this,t=0===this.state.squares.filter(function(e){return""===e}).length,a=void 0!==[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].find(function(t){var a=Object(s.a)(t,3),n=a[0],r=a[1],l=a[2],i=[e.state.squares[n],e.state.squares[r],e.state.squares[l]];return i.every(function(e){return e===i[0]&&""!==i[0]})});this.setState({player:t&&!a?"Tie":this.state.player,gameOver:a||t},function(){e.state.gameOver||e.setState({player:"X"===e.state.player?"O":"X"})})}},{key:"play",value:function(e){var t=this;"false"===e.getAttribute("clicked")&&!0!==this.state.gameOver&&(e.setAttribute("clicked","true"),this.setState({squares:this.state.squares.map(function(a,n){return n===parseInt(e.id)?t.state.player:a})},this.gameUpdate))}},{key:"rows_fill",value:function(e,t){var a=this,n=["green","red","red","blue","green","red","blue","blue","green"];return Array.from(Array(10).keys()).slice(e,t).map(function(e){return r.a.createElement("td",{key:e,className:n[e],onClick:function(e){a.play(e.target)},clicked:""===a.state.squares[e]?"false":"true",id:String(e)},r.a.createElement("h1",null,a.state.squares[e]))})}},{key:"playAudio",value:function(){var e=document.querySelector("audio");e.paused?(e.volume=.2,e.play(),document.getElementById("audio-msg").className="invisible"):(e.pause(),document.getElementById("audio-msg").className="mono")}},{key:"render",value:function(){var e=this,t="Tie"===this.state.player?"Tie":"Winner:  ".concat(this.state.player),a=r.a.createElement("div",{id:"end"},r.a.createElement("h1",null,t),r.a.createElement("button",{onClick:function(){e.setState({player:"X",squares:Array(9).fill(""),gameOver:!1})}},"Play Again"));return r.a.createElement("div",{className:"App"},r.a.createElement("div",{onClick:this.playAudio},r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"Tic Tac Toe"),r.a.createElement("p",null,r.a.createElement(h.a,{icon:d.a}))),r.a.createElement("p",{id:"audio-msg",className:"mono"},"Click here to play music")),r.a.createElement("table",{id:"board"},r.a.createElement("tbody",null,r.a.createElement("tr",null,this.rows_fill(0,3)),r.a.createElement("tr",null,this.rows_fill(3,6)),r.a.createElement("tr",null,this.rows_fill(6,9)))),r.a.createElement("div",{id:"bottom"},this.state.gameOver?a:r.a.createElement("h1",null,"Player: ",this.state.player)),r.a.createElement("h3",{className:"mono"},"Made by",r.a.createElement("a",{href:"https://github.com/akamran2001/Tic-Tac-Toe",target:"_blank",rel:"noopener noreferrer"}," Ahmed Kamran "),"Music: ",r.a.createElement("a",{href:"https://chll.to/0ac21dd1",target:"_blank",rel:"noopener noreferrer"},"Aiguille - Day and Night")))}}]),a}(r.a.Component)),f=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,26)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),f()}},[[13,1,2]]]);
//# sourceMappingURL=main.f1bc7b90.chunk.js.map
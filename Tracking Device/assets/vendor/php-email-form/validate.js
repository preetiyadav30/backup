// const { type } = require("os");
// const { serialize } = require("v8");

// (function(){
//     "use strict";
//      var newScript = document.createElement("script");
//      newScript.type = "text/javascript";
//      newScript.src = 'http://code.jquery.com/jquery-latest.js';
//      newScript.onload = function(){
//          $(document).ready(function(){
//              $("#loginid").on("submit",function(e){
//                  alert("login successfully..");
//                  console.log( $("#loginid").serialize(),"done");
//                  e.preventDefault();
//                  $.ajax({
//                      url:"http://localhost:8000/login",
//                      type:"post",
//                      data:$("#loginid").serialize(),
//                      success:function(result){
//                          alert(result);
//                      }
//                  });
//              });
//          });
//          var head = document.getElementsByTagName("head")[0];
//          head.appendChild(newScript);
//      };
// });
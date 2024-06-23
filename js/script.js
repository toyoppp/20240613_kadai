// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};
// Initialize Firebase
initializeApp(firebaseConfig);


function signUpUser(email, password) {

  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userInfo) {
      //　登録成功後にやりたいことをここに書く
      console.log(userInfo);
      location.href = "index.html";
    })
    .catch(function (error) {
      //登録失敗とかエラーのときにやりたいことをここに書く
      console.log(error);
      $("#message").html(error);
    });
}



// 新規登録（サインアップ）ボタンを押したら
$("#signup-button").on("click", function () {
  const email = $('#signup-email').val();
  const password = $("#signup-password").val();
  console.log(email, password, 1); //処理の流れの確認用処理の流れの確認用

  signUpUser(email, password);
});

// ログイン処理を担当する独自関数
function loginUser(email, password) {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then(function (userInfo) {
      // ログイン成功後にやりたいことをここに書く
      console.log(userInfo);
      location.href = "index.html";
    })
    .catch(function (error) {
      // ログイン失敗とかエラーのときにやりたい事をここに書く
      console.log(error);
      $("#message").html(error);
    });
}

// ログインボタンを押したときの処理
$("#login-button").on("click", function () {
  const email = $('#login-email').val();
  const password = $("#login-password").val();

  // loginUser関数を実行する
  loginUser(email, password);
});

// ログアウト処理をする関数
function logOutUser() {
  const auth = getAuth();
  signOut(auth)
    .then(function () {
      // ログアウトが成功したときにやりたいこをここに書く
      location.href = "login.html";
    })
    .catch(function (error) {
      // ログアウトが成功したときにやりたいこをここに書く
      console.log(error);
      $("#message").html(error);
    });
}

// ログアウトボタンを押したら
$("#logout-button").on("click", function () {
  logOutUser()
});

$(document).ready(function () {

  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      $("#welcome-message").html("Welcome!");
    } else {
      $("#welcome-message").html("Please Login...");
      $("#logout-button").hide();
    }
  })
});

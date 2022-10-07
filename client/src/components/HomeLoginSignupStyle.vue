<template>
  <div></div>
</template>

<style>
.btn_message {
  margin-bottom: 1em;
}
body {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-image: linear-gradient(to right, #d500f9, #ffd54f);
  background-repeat: no-repeat;
}

input,
textarea {
  background-color: #f3e5f5;
  border-radius: 50px !important;
  padding: 12px 15px 12px 15px !important;
  width: 100%;
  box-sizing: border-box;
  border: none !important;
  border: 1px solid #f3e5f5 !important;
  font-size: 16px !important;
  color: #000 !important;
  font-weight: 400;
}

input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #d500f9 !important;
  outline-width: 0;
  font-weight: 400;
}

button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}

.card {
  border-radius: 0;
  border: none;
}

.card1 {
  width: 70%;
  padding: 40px 30px 10px 30px;
}

.card2 {
  width: 30%;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  background-color: #f8f8f8;
  background-image: url('../Assets/pets_big.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#logo {
  width: 70px;
  height: 60px;
}

.heading {
  margin-bottom: 60px !important;
}

::placeholder {
  color: #000 !important;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #000 !important;
}

::-ms-input-placeholder {
  color: #000 !important;
}

.form-control-label {
  font-size: 12px;
  margin-left: 15px;
}

.msg-info {
  padding-left: 15px;
  margin-bottom: 30px;
}

.btn-color {
  border-radius: 50px;
  color: #fff;
  background-image: linear-gradient(to right, #ffd54f, #d500f9);
  padding: 15px;
  cursor: pointer;
  border: none !important;
  margin-top: 40px;
}

.btn-color:hover {
  color: #fff;
  background-image: linear-gradient(to right, #d500f9, #ffd54f);
}

.btn-white {
  border-radius: 50px;
  color: #d500f9;
  background-color: #fff;
  padding: 8px 40px;
  cursor: pointer;
  border: 2px solid #d500f9 !important;
}

.btn-white:hover {
  color: #fff;
  background-image: linear-gradient(to right, #ffd54f, #d500f9);
}

a {
  color: #000;
}

a:hover {
  color: #000;
}

.bottom {
  width: 100%;
  margin-top: 50px !important;
}

.sm-text {
  font-size: 15px;
}

@media screen and (max-width: 992px) {
  .card1 {
    width: 100%;
    padding: 40px 30px 10px 30px;
  }

  .card2 {
    width: 100%;
  }

  .right {
    margin-top: 100px !important;
    margin-bottom: 100px !important;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 10px !important;
  }

  .card2 {
    padding: 50px;
  }

  .right {
    margin-top: 50px !important;
    margin-bottom: 50px !important;
  }
}
</style>
<script>
export default {
  name: 'home-login-signup-style'
}
</script>

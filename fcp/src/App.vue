<template>
  <div id="app">
    <div id="login">
      <p v-if="user">Welcome {{user.username}}<br><a href="#" @click="logout">Logout</a></p>
      <p v-else><a href="#" @click="toggleForm">Register or Login</a></p>
    </div>
    <div class="header">
      <h1>Example Class</h1>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/student">Student</router-link> |
        <router-link to="/ta">Ta</router-link> |
        <router-link to="/admin">Admin</router-link> |
        <router-link to="/about">About</router-link> |
        <a href="https://github.com/rm13082016/finalCreativeProject">Github</a>
      </div>
    </div>
    <transition v-if="showForm" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <h1 class="modal-title">Register or Login</h1>
            </div>
            <div class="modal-body">
              <p v-if="error" class="error">{{error}}</p>
              <label>Username</label>
              <br>
              <input v-model="username">
              <br>
              <label>Password</label>
              <br>
              <input type="password" v-model="password">
            </div>
            <div class="modal-footer">
              <button @click="register" type="button">Register</button>
              <button @click="login" type="button" class="other">Login</button>
              <button @click="toggleForm" type="button" class="close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
  body {
    margin: 0px;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #login {
    display: flex;
    justify-content: flex-end;
    background: #002E5D;
    padding: 10px 100px;
    color: white;
  }
  .header {
    display: flex;
    justify-content: space-between;
    background: #002E5D;
    padding: 10px 100px;
    color: white;
  }
  
  #nav {
    padding: 30px;
  }
  
  #nav a, #login a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
  
  #nav a.router-link-exact-active {
    color: #0062B8;
  }
  .content {
    padding: 10px 100px;
  }
  
  /* Login Form */
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h1 {
    margin-bottom: 30px;
    font-size: 1.5em;
  }
  
  .modal-body {
    margin: 0;
  }
  
  .modal-body input {
    margin-bottom: 20px;
    height: 30px;
  }
  
  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data() {
    return {
      showForm: false,
      user: null,
      username: '',
      password: '',
      error: '',
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    toggleForm() {
      this.error = "";
      this.username = "";
      this.password = "";
      this.showForm = !this.showForm;
    },
    async register() {
      this.error = "";
      try {
        let response = await axios.post("/api/users", {
          username: this.username,
          password: this.password,
          level: 0,
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async login() {
      this.error = "";
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password,
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
        window.location.reload(true);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.user = null;
        window.location.reload(true);
      } catch (error) {
        // don't worry about it
      }
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
  }
}
</script>

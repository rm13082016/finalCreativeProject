<template>
  <div v-if="level > 1">
    <h1>Add a TA or Admin</h1>
    <a href="#" @click="toggleLoginForm">Add</a>
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
              <br>
              <input type="radio" v-model="addlevel" value="1">TA<br>
              <input type="radio" v-model="addlevel" value="2">Admin<br>
              <br>
            </div>
            <div class="modal-footer">
              <button @click="addUser" type="button">Add</button>
              <button @click="toggleLoginForm" type="button" class="close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <h1>Create a Problem</h1>
    <div v-if="creating">
      <input v-model="addedTitle" placeholder="Title">
      <p></p>
      <textarea v-model="addedDescription" placeholder="Problem"></textarea>
      <p></p>
      <input type="number" v-model="addedAnswer" placeholder="Answer">
      <p>Add image...</p>
      <input type="file" name="photo" @change="fileChanged">
      <br>
      <button type="button" @click="addProblem()">Submit</button>
    </div>
    <div v-else>
      <p>Thank you for submitting a problem! We will respond shortly.</p>
      <p><a @click="toggleForm" href="#">Submit another problem</a></p>
    </div>
    <h1>Problems</h1>
    <div class="problem" v-for="problem in problems" v-bind:key="problem._id">
        <p><b>{{problem.title}}</b></p>
        <p>{{problem.problem}}</p>
        <button type="button" @click="deleteProblem(problem._id)">Delete</button>
    </div>
  </div>
  <p v-else>You are not authorized to view this page.</p>
</template>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      addedTitle: '',
      addedDescription: '',
      addedAnswer: '',
      file: null,
      problems: [],
      user: null,
      level: 0,
      username: '',
      password: '',
      error: '',
      addlevel: null,
      showForm: false,
    }
  },
  created() {
    this.getProblems();
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
        this.level = this.user.level;
        console.log(this.level);
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
    toggleLoginForm() {
      this.error = "";
      this.username = "";
      this.password = "";
      this.addLevel = 0;
      this.showForm = !this.showForm;
    },
    async addUser() {
      this.error = "";
      console.log(this.addlevel);
      try {
        await axios.post("/api/users", {
          username: this.username,
          password: this.password,
          level: this.addlevel
        });
        // close the dialog
        this.toggleLoginForm();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    toggleForm() {
      this.creating = !this.creating;
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async addProblem() {
      console.log('Add Problem');
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post("/api/problems/photo", formData);
        await axios.post("/api/problems", {
          title: this.addedTitle,
          problem: this.addedDescription,
          path: r1.data.path,
          answer: this.addedAnswer
        });
        this.addedTitle = "";
        this.addedDescription = "";
        this.addedAnswer = "";
        this.creating = false;
        this.getProblems();
      } catch (error) {
        console.log(error);
      }
    },
    async getProblems() {
      try {
        let response = await axios.get("/api/problems");
        this.problems = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProblem(id) {
      try {
        await axios.delete("/api/problems/" + id);
        this.getProblems();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
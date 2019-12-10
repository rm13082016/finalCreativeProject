<template>
  <div v-if="user" class="student">
    <h1>Practice Problems</h1>
    <div v-for="(problem, index) in problems" v-bind:key="problem._id">
      <hr>
      <div class="problem">
        <div class="problem">
          <p><b>{{problem.title}}</b></p>
          <p>{{problem.problem}}</p>
          <img :src="problem.path" alt="" width="400px" />
          <br>
          <input type="number" v-model="input[index]" />
          <button type="button" @click="checkAnswer(input[index], problem.answer)">Check Answer</button>
        </div>
      </div>
    </div>
  </div>
  <p v-else>You must be logged in to view practice problems</p>
</template>

<style>
  .student {
    text-align: left;
  }
</style>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      problems: [],
      input: [],
      user: null,
    };
  },
  created() {
    this.getUser();
    this.getProblems();
  },
  methods: {
    async getProblems() {
      try {
        let response = await axios.get("/api/problems");
        this.problems = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    checkAnswer(ans1, ans2) {
      if(ans1 == ans2) {
        alert("Correct!");
      }
      else {
        alert("Try Again");
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
};
</script>

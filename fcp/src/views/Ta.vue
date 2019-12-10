<template>
  <div v-if="level > 0" class="ta">
    <h1>Solutions</h1>
    <div v-for="problem in problems" v-bind:key="problem._id">
      <hr>
      <div class="problem">
        <div class="problem">
          <p><b>{{problem.title}}</b></p>
          <p>{{problem.problem}}</p>
          <img :src="problem.path" alt="" width="400px" />
          <br>
          <p>Answer: {{problem.answer}}</p>
        </div>
      </div>
    </div>
  </div>
  <p v-else>You are not authorized to view this page</p>
</template>

<style>
  .ta {
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
      user: null,
      level: 0,
    };
  },
  created() {
    this.getProblems();
    this.getUser();
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
  }
};
</script>

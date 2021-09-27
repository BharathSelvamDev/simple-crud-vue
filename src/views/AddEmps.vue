<template>
  <div class="add-emps">
    <v-card>
      <div class="formbg-inner padding-horizontal--48">
        <form id="stripe-login">
          <div class="field padding-bottom--24">
            <label for="name">Name</label>
            <input v-model="name" type="text" name="name" />
          </div>
          <div class="field padding-bottom--24">
            <div class="grid--50-50">
              <label for="city">City</label>
            </div>
            <input v-model="city" type="text" name="city" />
          </div>
          <div class="field padding-bottom--24">
            <label for="phone">Phone Number</label>
            <input v-model="phone" type="text" name="phone" />
          </div>
          <div class="field padding-bottom--24">
            <label for="hobby">Hobby</label>
            <input v-model="hobby" type="text" name="hobby" />
          </div>
        </form>
        <div class="field padding-bottom--24">
          <input
            type="submit"
            name="submit"
            @click="CheckInfo()"
            value="Add Person"
          />
        </div>

        <div class="field padding-bottom--24">
          <input
            type="submit"
            name="submit"
            @click="GoToAdmin()"
            value="Back"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "AddEmps",
  data() {
    return {
      name: "",
      city: "",
      phone: "",
      hobby: "",
      data: "",
    };
  },
  methods: {
    CheckInfo() {
      if (
        this.name.length < 1 ||
        this.city.length < 1 ||
        this.phone.length < 1 ||
        this.hobby.length < 1
      ) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Please Fill The Details",
          showConfirmButton: true,
          timer: 2000,
        });
      } else {
        this.AddDetails();
      }
    },

    GoToAdmin() {
      this.$router.push("/");
    },

    AddDetails() {
      axios
        .post(
          "https://vue-api-boot.herokuapp.com/add/" +
            this.name +
            "/" +
            this.city +
            "/" +
            this.phone +
            "/" +
            this.hobby
        )
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
          if (response.data === "Added") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Added Successfully",
              showConfirmButton: true,
              timer: 1500,
            }).then((data) => {
              console.log(data);
              this.$router.push("/");
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.add-emps {
  width: 50%;
  margin: 0 auto;
  margin-top: 30px;
}

.v-card {
  background: rgb(134, 225, 253);
}

.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}
.formbg {
  margin: 0 auto;
  width: 100%;
  max-width: 448px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0 7px 14px 0,
    rgba(0, 0, 0, 0.12) 0 3px 6px 0;
}
label {
  margin-bottom: 10px;
}
label {
  font-size: 14px;
  font-weight: 600;
  display: block;
}
.grid--50-50 {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
}
.field input {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: #fff;
  box-shadow: transparent 0 0 0 0, transparent 0 0 0 0, transparent 0 0 0 0,
    rgba(60, 66, 87, 0.16) 0 0 0 1px, transparent 0 0 0 0, transparent 0 0 0 0,
    transparent 0 0 0 0;
}
input[type="submit"] {
  background-color: #5469d4;
  box-shadow: transparent 0 0 0 0, transparent 0 0 0 0,
    rgba(0, 0, 0, 0.12) 0 1px 1px 0, #5469d4 0 0 0 1px, transparent 0 0 0 0,
    transparent 0 0 0 0, rgba(60, 66, 87, 0.08) 0 2px 5px 0;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
</style>
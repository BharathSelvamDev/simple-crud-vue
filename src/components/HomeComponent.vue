<template>
  <div class="admin">
    <div class="add-btn">
      <router-link to="/add">
        <v-btn depressed color="primary"> Add People </v-btn>
      </router-link>
    </div>
    <v-card style="margin: 2% 10% 2% 10%">
      <v-card-title>
        Information
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="data"
        fixed-header
        height="350px"
        style="margin: 1% 5% 1% 5%"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.id }}</td>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.city }}</td>
            <td>{{ row.item.phoneNo }}</td>
            <td>{{ row.item.hobby }}</td>
            <td>
              <v-btn
                class="mx-2"
                @click="EditData(row.item.id)"
                dark
                small
                color="success"
              >
                Edit
              </v-btn>
            </td>
            <td>
              <v-btn
                class="mx-2"
                @click="DeleteDataById(row.item.id)"
                dark
                small
                color="pink"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "HomeComponent",
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "City", value: "city" },
        { text: "PhoneNo", value: "phoneNo" },
        { text: "Hobby", value: "hobby" },
        { text: "Edit Actions", value: "edit-action", sortable: false },
        { text: "Delete Actions", value: "delete-action", sortable: false },
      ],
      data: [],
      search: "",
      details: "",
    };
  },
  mounted() {
    this.GetAllData();
  },

  methods: {
    GetAllData() {
      axios.get("https://vue-api-boot.herokuapp.com/get").then((response) => {
        this.data = response.data;
        console.log(response.data);
      });
    },

    DeleteDataById(id) {
      console.log("Del : " + id);
      Swal.fire({
        title: "Are you sure , want to delete this row?",
        showCancelButton: true,
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("https://vue-api-boot.herokuapp.com/delete/" + id)
            .then((response) => {
              this.details = response.data;
              console.log(response.data);
              if (response.data == "Deleted Successfully") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Deleted Successfully",
                  showConfirmButton: true,
                  timer: 1500,
                });
              }
              this.GetAllData();
            });
        }
      });
    },

    EditData(id) {
      this.$router.push("/edit/" + id);
    },
  },
};
</script>

<style scoped>
.add-btn {
  margin-top: 30px;
  margin-left: 80%;
}
</style>
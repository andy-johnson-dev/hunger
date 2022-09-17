<template>
  <label><h1 class="text-secondary">Shopping List for 3/12 - 4/12</h1></label>
  <v-divider></v-divider>
  <v-table class="ma-2" height="70vh" fixed-header>
    <thead>
      <tr>
        <th class="text-left text-secondary">Qty</th>
        <th class="text-left text-secondary"></th>
        <th class="text-left text-secondary">Name</th>
        <th class="text-left text-secondary">Calories</th>
        <th class="text-left text-secondary">Protein</th>
        <th class="text-left text-secondary">Sugar</th>
        <th class="text-left text-secondary">Carbs</th>
        <th class="text-left text-secondary"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>
          <input
            class="form-control qty-input text-secondary"
            placeholder="0"
          />
        </td>
        <td>
          <img class="list-img mt-1" :src="item.url" />
        </td>
        <td class="text-secondary">{{ item.name }}</td>
        <td class="text-secondary">{{ item.calories }}</td>
        <td class="text-secondary">{{ item.calories }}</td>
        <td class="text-secondary">{{ item.calories }}</td>
        <td class="text-secondary">{{ item.calories }}</td>
        <td>
          <div class="del-btn">
            <v-btn size="x-small" color="error" variant="outlined" icon>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-text-field
    class="mt-4 text-secondary"
    density="compact"
    placeholder="Search for Ingredients"
    color="secondary"
    append-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      photo: "../assets/images/fork_logo.png",
      hovered: "",
      desserts: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Eclair",
          calories: 262,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Cupcake",
          calories: 305,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Gingerbread",
          calories: 356,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Jelly bean",
          calories: 375,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Lollipop",
          calories: 392,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Honeycomb",
          calories: 408,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "Donut",
          calories: 452,
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUH2jJ-oIIeFvrlPT07gLOzuykVt3BSHu4Q&usqp=CAU",
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  methods: {},
  components: {},
};
</script>

<style>
.list-img {
  border: 1px solid rgb(99, 181, 219);
  border-radius: 10px;
  padding: 1px;
  width: 75px;
}
img:hover {
  box-shadow: 0 0 2px 1px rgba(124, 222, 255, 0.897);
  opacity: 70%;
  transition: 0.2s;
}
.qty-input {
  width: 25px;
  height: 25px;
  border: 1px solid rgb(31, 59, 71);
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgba(31, 59, 71, 0.497);
}
.del-btn {
}
</style>
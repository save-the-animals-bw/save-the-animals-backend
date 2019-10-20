
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("organizations")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("organizations").insert([
        { id: 1, organ_name: "African Wildlife Foundation" },
        { id: 2, organ_name: "Clearwater Marine Foundation" },
        { id: 3, organ_name: "African Animals Resucue" }
      ]);
    });
};

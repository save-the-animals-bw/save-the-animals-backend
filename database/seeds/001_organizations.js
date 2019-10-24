
exports.seed = function(knex) {
 
    
      
      return knex("organizations").insert([
        {  organ_name: "African Wildlife Foundation" },
        {  organ_name: "Clearwater Marine Foundation" },
        {  organ_name: "African Animals Resucue" }
      ]);
    
};

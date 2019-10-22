
exports.up = function(knex) {
  return knex.schema
    .createTable("campaigns", tbl => {
      tbl.increments();
      tbl.string("title", 255).notNullable();
      tbl.string("location", 255).notNullable();
      tbl.string("species", 255).notNullable();
      tbl
        .integer("urgency")
        .notNullable()
        .unsigned();
      tbl.string("image_url", 255);
      tbl
        .integer("organization_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
       tbl
          .integer("funding_received")
          .unsigned()
          .notNullable()
         .defaultTo(0);
       
    })
    .createTable("funding", tbl => {
      tbl.increments();
      tbl
        .string("donation_name", 255)
        .notNullable()
        tbl
          .integer("amount_need")
          .unsigned()
            .notNullable();
       tbl
          .string("campaign_id")
         .unsigned()
         .notNullable()
          .references("id")
          .inTable("campaigns")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("funding")
    .dropTableIfExists("campaigns");
};

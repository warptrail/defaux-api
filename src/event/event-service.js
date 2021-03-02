const EventService = {
  getAllEvents(db, user_id) {
    return db
      .from('event')
      .select('*')
      .leftJoin('category', 'event.category_id', 'category.category_id')
      .where('event.user_id', user_id)
      .orderBy('id');
  },

  /* Raw SQL:
    select * from event
    inner join category on event.category_id=category.category_id
    where event.user_id = 1;
  */

  getSpecificEvent(db, id) {
    return db.from('event').select('*').where('id', id).first();
  },

  createEvent(db, newEvent) {
    return db.insert(newEvent).into('event').returning('*');
  },

  deleteEvent(db, id) {
    return db('event').where({ id }).delete();
  },

  updateEvent(db, id, updates) {
    return db('event').where({ id }).update(updates).returning('info');
  },

  getAllCategories(db, user_id) {
    return db
      .from('category')
      .select('*')
      .where('user_id', user_id)
      .orderBy('encoded_name');
  },

  createCategory(db, newCategory) {
    return db.insert(newCategory).into('category').returning('*');
  },

  getSpecificCategory(db, id) {
    return db.from('category').select('*').where('category_id', id).first();
  },

  deleteCategory(db, id) {
    return db('category').where({ id }).delete();
  },

  updateCategory(db, id, updates) {
    return db('category')
      .where('category_id', id)
      .update(updates)
      .returning('*');
  },
};

module.exports = EventService;

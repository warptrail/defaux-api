const EventService = {
  getAllEvents(db, user_id) {
    return db.from('event').select('*').where('user_id', user_id).orderBy('id');
  },

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
};

module.exports = EventService;

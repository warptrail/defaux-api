const EventService = {
  getAllEvents(db, user_id) {
    return db.from('event').select('*').where('user_id', user_id).orderBy('id');
  },

  getSpecificEvent(db, id) {
    return db.from('event').select('*').where('id', id).first();
  },
};

module.exports = EventService;

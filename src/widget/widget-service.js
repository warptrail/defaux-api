const WidgetService = {
  getAllWidgets(db) {
    return db.from('widget').select('*').orderBy('id');
  },

  getSpecificWidget(db, id) {
    return db.from('widget').select('*').where('id', id).first();
  },

  convertToArray(rawWidgets) {
    const widgets = [];
    rawWidgets.map((w) => {
      widgets.push(w.name);
    });
    return widgets;
  },

  async getRandomWidget(db) {
    const allWidgets = await this.getAllWidgets(db);
    const arrayOfAllWidgetNames = this.convertToArray(allWidgets);

    return arrayOfAllWidgetNames[
      Math.floor(Math.random() * arrayOfAllWidgetNames.length)
    ];
  },

  insertWidget(db, newWidget) {
    return db.insert(newWidget).into('widget').returning('*');
  },

  deleteWidget(db, id) {
    return db('widget').where({ id }).delete();
  },

  updateWidget(db, id, updates) {
    return db('widget').where({ id }).update(updates).returning('*');
  },
};

module.exports = WidgetService;

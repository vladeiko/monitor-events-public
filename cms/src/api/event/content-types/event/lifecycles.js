module.exports = {
  afterCreate(event) {
    const { result } = event;

    strapi.socketIo.emit("eventCreated", result);
  },

  afterDelete(event) {
    const deletedId =
      event.result?.id || event.params.where["$and"][0]?.id["$in"][0];

    strapi.socketIo.emit("eventDeleted", deletedId);
  },

  afterUpdate(event) {
    const { result } = event;

    strapi.socketIo.emit("eventUpdated", result);
  },
};

module.exports = {
  afterCreate(event) {
    const { result } = event;

    strapi.socketIo.emit("instanceCreated", result);
  },

  afterDelete(event) {
    const deletedId =
      event.result?.id || event.params.where["$and"][0]?.id["$in"][0];

    strapi.socketIo.emit("instanceDeleted", deletedId);
  },

  afterUpdate(event) {
    const { result } = event;

    strapi.socketIo.emit("instanceUpdated", result);
  },
};

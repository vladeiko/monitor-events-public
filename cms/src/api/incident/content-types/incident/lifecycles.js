module.exports = {
  afterCreate(event) {
    const { result } = event;
    console.log(result);
    strapi.socketIo.emit("incidentCreated", result);
  },

  afterDelete(event) {
    const deletedId =
      event.result?.id || event.params.where["$and"][0]?.id["$in"][0];

    strapi.socketIo.emit("incidentDeleted", deletedId);
  },

  afterUpdate(event) {
    const { result } = event;

    strapi.socketIo.emit("incidentUpdated", result);
  },
};

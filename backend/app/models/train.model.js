module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      from: String,
      to: String,
      time: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Train = mongoose.model("Train", schema);
  return Train;
};

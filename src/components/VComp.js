export default {
  props: {
    message: {
      type: String,
      default: "Default Message"
    }
  },
  render() {
    return <p>hello {this.message}</p>;
  }
};

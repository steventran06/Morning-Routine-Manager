class AddRoutine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // add state here
    };
  }


  render() {
    console.log('rendering');
    return (
      <div class="col-sm-12">
        <form>
          <input type="text" id="newRoutine">
          <input type="submit" value="Submit">
        </form>
      </div>
    );
  }
}


window.AddRoutine = AddRoutine;

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   // add state here
    // };
  }


  render() {
    console.log('rendering');
    return (
      <div class="row">
        <AddRoutine />
      </div>
      <div class="row">
        <Routines />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

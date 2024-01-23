import React from "react";

class UserCardClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
    console.log(this.props.name, "constructor");
  }
  async componentDidMount() {
    const res = await fetch(`https://api.github.com/users/Amandubey211`);
    const data = await res.json();
    console.log(data);
    if (data) {
      this.setState({
        userData: data,
      });
    }
  }
  render() {
    console.log(this.props.name, "render");
    return (
      <>
        <div className="border rounded-3 p-3 ">
          <div className="d-flex justify-content-center">
          <img  className="rounded-3" style={{height:"120px"}} src={this.state.userData?.avatar_url} />
          </div>
         
          <hr />
          <h3> {this.state.userData?.name}</h3>
          <h6> Address:{this.state.userData?.location}</h6>
          <a href={this.state.userData?.blog}> visit Portfolio</a>
          <hr/>
          <div className="d-flex justify-content-start gap-3 align-items-center">
            <button
              onClick={() => {
                //never update state variable directly

                this.setState({
                  count: this.state.count + 1,
                });
              }}
            >
              increase
            </button>
            <button
              onClick={() => {
                if (this.state.count > 0) {
                  this.setState({
                    count: this.state.count - 1,
                  });
                }
              }}
            >
              decrease
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default UserCardClass;

import React, { Component } from "react";
import { Button, Container, Input, Table } from "reactstrap";
import io from "socket.io-client";

const API_URL = "http://localhost:8000";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      userCount: 0,
      user: "",
      pesan: "",
    };
  }

  joinChat = () => {
    console.log(this.state.user);
    console.log(io(API_URL));
    const socket = io(API_URL);
    socket.emit("JoinChat", { nama: this.state.user });
    socket.on("chat message", (msgs) => this.setState({ message: msgs }));
  };

  renderMessage = () => {
    return this.state.message.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.nama}</td>
          <td>{item.message}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Container style={{ background: "red" }}>
        <Input
          placeholder="Join Name"
          onChange={(e) => {
            this.setState({ user: e.target.value });
          }}
        />
        <Button onClick={this.joinChat}>Join</Button>
        <Table>
          <thead>
            <th>Nama</th>
            <th>Pesan</th>
            <th>
              <Button>Clear</Button>
            </th>
          </thead>
          <tbody></tbody>
          <tfoot>
            <td colSpan="2">
              <Input
                type="textarea"
                value={this.state.pesan}
                placeholder="Your message"
                onChange={(e) => {
                  this.setState({ pesan: e.target.value });
                }}
              />
            </td>
            <td>
              <Button>Send</Button>
            </td>
          </tfoot>
        </Table>
      </Container>
    );
  }
}

export default App;

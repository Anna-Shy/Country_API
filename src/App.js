import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;

    if (!DataisLoaded)
      return (
        <div className="load">
          <h1 className="load__title title"> Please wait ... </h1>
        </div>
      );

    return (
      <div className="app">
        <header>
          <div className="container">

            <div className="header__inner">
              <h1 className="header__title title">Country</h1>

              <button className="header__btn">Click me</button>
              <button className="header__btn">Click me</button>
              <button className="header__btn">Click me</button>
            </div>
            
          </div>
        </header>

        <main>
          <div className="container">

            <div className="main__inner">
              {items.map((item) => (
                <ul className="main__list" key={item.id}>
                  <li>Country: {item.name}</li>
                  <li>Region: {item.region}</li>
                  <li>Area size: {item.area}</li>
                </ul>
              ))}
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;

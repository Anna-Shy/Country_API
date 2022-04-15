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

  smallerCountryFilter = () => {
    this.setState({
      items: this.state.items.filter((item) => item.area <= 65300),
      DataisLoaded: true,
    });
  };

  oceaniaFilter = () => {
    this.setState({
      items: this.state.items.filter((item) => item.region === "Oceania"),
      DataisLoaded: true,
    });
  };

  ascsortNameCountry = () => {
    this.setState({
      items: this.state.items.sort((a, b) => a.name.localeCompare(b.name)),
      DataisLoaded: true,
    });
  };

  descsortNameCountry = () => {
    this.setState({
      items: this.state.items.sort((a, b) => b.name.localeCompare(a.name)),
      DataisLoaded: true,
    });
  };
  
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

              <button
                className="header__btn"
                onClick={this.smallerCountryFilter}
              >
                Smaller than Lithuania
              </button>
              <button className="header__btn" onClick={this.oceaniaFilter}>
                Oceania region
              </button>
              <button className="header__btn" onClick={this.ascsortNameCountry}>
                Sort by name asc
              </button>
              <button className="header__btn" onClick={this.descsortNameCountry}>
                Sort by name desc
              </button>
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
                  <li>Area size: {item.area ? item.area : (item.area = 0)}</li>
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

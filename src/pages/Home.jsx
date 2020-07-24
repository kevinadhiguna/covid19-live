import React, { useEffect, useState } from 'react';
// styling
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// react-bootstrap
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
// react-columns
import Columns from 'react-columns';
// react-number-format
import NumberFormat from 'react-number-format';
// react-tooltip
import ReactTooltip from 'react-tooltip';
// react-spinners (RingLoader)
import RingLoader from 'react-spinners/RingLoader';
// react-toggle
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
// axios
import axios from 'axios';

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get('https://corona.lmao.ninja/v2/all'),
        axios.get('https://corona.lmao.ninja/v2/countries')
      ])
      .then(responseArr => {
        // console.log(res.data); <= can be 'console.log(res)' as well 
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item => {
    return searchCountries !== "" 
      ? item.country.toLowerCase().includes(searchCountries) 
      : item;
  });

  const countries = filterCountries.map((data, index) => {
    return(
      <Card
        key={index}
        bg={darkTheme ? "dark" : "light"}
        text={darkTheme ? "light" : "dark"}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>Deaths: {data.deaths}</Card.Text>
          <Card.Text>Recovered: {data.recovered}</Card.Text>
          <Card.Text>Today's cases: {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths: {data.todayDeaths}</Card.Text>
          <Card.Text>Active: {data.active}</Card.Text>
          <Card.Text>Critical: {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  const handleDarkThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div 
      style={{
        backgroundColor: darkTheme ? "#000" : "#fff",
        color: darkTheme ? "#fff" : "#000" 
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "center" }} >
        <RingLoader size={50} color="green" loading={loading} />
      </div>
      <br />
      <h2 
        data-tip="Last modified date: 24 Jul 2020"
        style={{ textAlign: "center" }}
      >
        Covid-19 Live Stats
      </h2>
      <ReactTooltip effect="solid" />
      <br />
      <div style={{ textAlign: "center" }} >
        <Toggle 
          defaultChecked={false}
          icons={{
            checked: "🌜",
            unchecked: "🌞"
          }}
          onChange={handleDarkThemeChange}
        />
      </div>
      <br />
      <CardDeck>
        <Card 
          bg='secondary' 
          text='white' 
          style={{margin: '10px'}}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            {/* <Card.Text>{latest.cases}</Card.Text> */}
            <NumberFormat 
              value={latest.cases}
              displayType="text"
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card 
          bg='danger' 
          text='white'
          style={{margin: '10px'}}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            {/* <Card.Text>{latest.deaths}</Card.Text> */}
            <Card.Text>
              {" "}
              <NumberFormat 
                value={latest.deaths}
                displayType="text"
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card 
          bg='success' 
          text='white'
          style={{margin: '10px'}}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            {/* <Card.Text>{latest.recovered}</Card.Text> */}
            <Card.Text>
              {" "}
              <NumberFormat 
                value={latest.recovered}
                displayType="text"
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form style={{ textAlign: "center" }} >
        <Form.Group controlId="formGroupSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control 
            bg="dark"
            type="text" 
            placeholder="What country are you looking for?" 
            onChange={e => setSearchCountries(e.target.value)}
          />
          <Form.Text className="text-muted">
            Stay Healthy, Stay Positive :)
          </Form.Text>
        </Form.Group>
      </Form>
      {/* 
        * -> Create cards of each countries
        * -> '{countries}' component is inside <CardColumns> tag so it can be shown in a row. 
        */
      }
      <Columns queries={queries}>
        {countries}
      </Columns>
    </div>
  );
}

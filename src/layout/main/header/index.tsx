import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

interface ItemProps {
  name: string;
  options: Array<any>;
}

const TopbarDropdown = ({ name, options }: ItemProps) => {
  return (
    <NavDropdown title={name} id="basic-nav-dropdown">
      {options?.map((option, index) => (
        <NavDropdown.Item key={index}>
          <NavLink to={option.link}>{option.name}</NavLink>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

const Topbar = (props: any) => {
  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <div onClick={props.onClick}>
          <GiHamburgerMenu className="text-white" />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin/listClients">List of clients</Nav.Link>
            <Nav.Link href="/admin/market-analysis">Market Analysis</Nav.Link>
            <TopbarDropdown
              name="Live Market"
              options={[
                { name: "Race 20-20", link: "#1" },
                { name: "Queen", link: "#2" },
                { name: "Baccarat", link: "#3" },
                { name: "Sports Casino", link: "#4" },
                { name: "Casino War", link: "#5" },
                { name: "Worli", link: "#6" },
                { name: "3 Cards Judgement", link: "#7" },
                { name: "32 Cards Casino", link: "#8" },
                { name: "Live TeenPatti", link: "#9" },
                { name: "TeenPatti 2.0", link: "#10" },
                { name: "Live Poker", link: "#11" },
                { name: "Andar Bahar", link: "#12" },
                { name: "Lucky 7", link: "#13" },
                { name: "Dragon Tiger", link: "#14" },
                { name: "Bollywood Casino", link: "#15" },
                { name: "Cricket Casino", link: "#16" },
              ]}
            />
            <TopbarDropdown
              name="Reports"
              options={[
                {
                  name: "Account's Statement",
                  link: "/admin/account-statement",
                },
                { name: "Current Bets", link: "/admin/current-bets" },
                { name: "General Report", link: "/admin/general-report" },
                { name: "Game Report", link: "/admin/game-report" },
                { name: "Casino Report", link: "/admin/casino-report" },
                { name: "Profit And Loss", link: "/admin/profit-loss" },
                { name: "Casino Result Report", link: "/admin/casinoresult" },
              ]}
            />
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex algin-items-center">
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="User Name"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Secure Auth Verification
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/change-password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="All Clients" />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;

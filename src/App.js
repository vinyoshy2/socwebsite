import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.scss';

import pagesJson from './data/json/pages.json';
import coursesJson from './data/json/courses.json';
import peopleJson from './data/json/people.json';
import karrieJson from './data/json/karrie.json';
import projectsJson from './data/json/projects.json';
import publicationsJson from './data/json/publications.json';

import {getMatchingAuthors} from './utils/utils.js'
import {getMatchingPublications} from './utils/utils.js'
import {getTopPublications} from './utils/utils.js'

import Grid from '@material-ui/core/Grid';

import { PeopleList, PublicationList, CourseList, ProjectList } from './components/ListComponents';
import { ListPage, PublicationListContainer } from './containers/ListContainers';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
/**
 * App - contains everything. Wraps a NavBar and a page contents.
 *
 * [STATE] currentPage - The page being displayed. "Home" by default.
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: "Home"
    };
    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(pageName){
    this.setState({
      currentPage: pageName
    });
  }

  render(){
    let pageContents;
    let current = this.state.currentPage;


    return(
      <div className="App">
        <Router>
          <NavBar json={pagesJson} loadPage={this.goToPage}/>
          <Switch>
	    <Route exact path="/">
              <HomePage />
	    </Route>
	    <Route exact path="/Home">
              <HomePage />
	    </Route>
            <Route exact path="/People">
              <ListPage json={peopleJson} pageType = "People"/>
	    </Route>
	    <Route exact path="/Research">
              <ListPage json={publicationsJson} pageType = "Publications"/>
	    </Route>
            <Route exact path="/Courses">
              <ListPage json={coursesJson} pageType = "Courses"/>
	    </Route>
	  </Switch>
	</Router>
      </div>
    );
  }

}


/**
 * NavBar - the navigation bar at the top of the page.
 *          https://react-bootstrap.github.io/components/navbar/
 *
 * [PROPS] loadPage - function that passes page clicked to App
 */
class NavBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };

  }

  handleClick(pageName){
    this.props.loadPage(pageName);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    let pagesArray = pagesJson.pages;
    let pages = pagesArray.map(
      (page) => <NavOption
                  key={pagesArray.indexOf(page)}
                  title={page.title}
	          extension={page.extension}
                  onClick={this.handleClick}
                />
    );

    return(
      <div className="NavBar">
          {pages}
      </div>
    );

  }
}


/**
 * NavOption - one of the links in the navigation bar.
 *
 * [PROPS] onClick - function to be called when clicked.
 *         title - the title of the page it links to
 */
class NavOption extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick(this.props.extension);
  }

  render(){
    return(
      <Link to={"/" + this.props.extension}>
        <span onClick={this.handleClick} className="NavOption" id={this.props.extension}>
          {this.props.title}
        </span>
      </Link>
    );
  }

}


/*****************************************************************************************************************

                                            INDIVIDUAL PAGES

*****************************************************************************************************************/


/* HomePage - The home page of the social spaces website.
 *
 * [PROPS]
 */
class HomePage extends Component {
  render(){
    let allProjects = projectsJson.entries;
    let featuredProjects = allProjects.filter(
      function(value, index, arr){
        return (value.onFrontPage === true);
      }
    );

    let projList = featuredProjects.map(
      (project) => <li key={featuredProjects.indexOf(project)}>
          <div>{project.title}</div>
          <div>{project.description}</div>
          <div> {getTopPublications(2, project.projectId, publicationsJson)} </div>
      </li>
    );

    return(
      <div className="Home">
        <div className="Top">
          <div className="Statement">
            <strong>Our goal</strong> is to investigate sociable systems for mediated communication.
            This encompasses a wide range of areas:<br/><br/>

            ➭ Explore and build virtual-physical spaces for mediated communication<br/>
            ➭ Build communication objects that connect people and/or spaces<br/>
            ➭ Build interactive interfaces that connect spaces<br/>
            ➭ Visualize and study how people interact within social spaces<br/><br/>
            And more!
          </div> 
	  <img src={"/images/frontpage3.jpg"} style={{width:"100%"}}/>
        <hr />
        <div className="WhatsNew">
          <h2>What's New</h2>
          {projList}
        </div>
        </div>
      </div>

    );
  }
}



export default App;

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

export const Person = (props) => {

    return(
      <Grid container className="Person" justify="flex-start" spacing={3}>
        <Grid item>
          <div className="ImageContainer">
            {
              props.photoUrl.length > 0
              ? (<img className="Image" src={process.env.PUBLIC_URL + props.photoUrl} />)
              : (<img className="Image" src={'/images/staircase.png'} />)
            }
          </div>
        </Grid>
        <Grid item container xs={8} spacing={3} justify="flex-start" direction="column">
          <Grid item>
            {
              props.pageUrl.length > 0 ?
              (<a href={props.pageUrl} className="Name">{props.name} </a>):
              (<span className="Name">{props.name}</span>)
            }
            {
              props.gradYear ?
              (<div className="DegreeYear"> {props.degree}{' '}{props.gradYear}</div>) :
              (<div className="DegreeYear">{props.degree}</div>)
            }
          </Grid>
          <Grid item>
            {props.currentRole ?
              (<div className="CurrentRole">Now at {props.currentRole}</div>):
              (<span></span>)
            }
          </Grid>
          <Grid>
            <div className="BriefIntro">{props.researchDesc}</div> 
          </Grid>
        </Grid>
      </Grid>
    );

}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  pageUrl: PropTypes.string,
  photoUrl: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  currentRole: PropTypes.string,
  researchDesc: PropTypes.string,
  gradYear: PropTypes.number
};

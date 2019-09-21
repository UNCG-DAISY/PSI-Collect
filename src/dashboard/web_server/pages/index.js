/* eslint-disable react/prop-types */
import Layout from "../components/layout";
// import Checkbox_Form from "../components/form/checkbox";
//import Radiobutton_Form from "../components/form/radiobuttons";
import MyTheme from "../components/theme";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles  } from "@material-ui/core/styles";
import { red, green } from '@material-ui/core/colors';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Fetch from 'isomorphic-fetch'
import axios from 'axios';



import { Formik, Field } from "formik";
import * as Yup from 'yup'

import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;
const SAD_FACE = `
https://www.nationwidechildrens.org/-/media/nch/giving/images/on-our-sleeves-1010/icons/icon-teasers/w45084_iconcollectionlandingiconteaserimages_facesad.jpg
`;

const SkipButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}))(Button);

const SubmitButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[900],
    },
  },
}))(Button);


const useStyles = makeStyles(theme => ({
  //https://codesandbox.io/s/material-ui-both-right-and-left-aligned-icons-in-appbar-2e5qr
  toolbarButtons: {
    marginLeft: "auto"
  },
  formControl: {
    margin: theme.spacing(3),
  },
  root_grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3, 0),
    margin: theme.spacing(0, 0)
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {
    maxWidth: 700
  },
  
  media: {
    display:'fluid'
  }
}));

const InputFeedback = ({ error }) =>
error ? <div style={MyTheme.palette.red500}>{error}</div> : null;

// InputFeedback.propTypes = {
//   error: PropTypes.string,
// };
// Radio input
const RadioButton = ({
  field: { name, onChange, onBlur },
  id,
  label,
  
  style,

}) => {
  return (
    <div>
      <FormControlLabel

        control={<Radio style={style} />}
        label={label}
        onChange={onChange}
        name={name}
        id={id}
        value={id}
        onBlur={onBlur}
        
      />
     
    </div>
  );
};

// RadioButton.propTypes = {
//   field: PropTypes.object,
//   id:PropTypes.string,
//   label:PropTypes.string,
//   className:PropTypes.string,
//   style:PropTypes,
//   props:PropTypes.object
// };

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  
  children,
  onChange,
  style
}) => {
  return (
    <div className={''}>
 
        {/* <legend>{label}</legend> */}
        <FormLabel component="legend" style={style}>{label}</FormLabel>
        <RadioGroup id={id} label='' aria-label="position" name="position" value={value} onChange={onChange} row>
        
      
        {React.Children.map(children, child => {
            
            return React.cloneElement(child, {
              style:style
            });
          })}
        </RadioGroup>
        {touched && <InputFeedback error={error} />}
   
    </div>
  );
};

// Checkbox input
const CheckboxButton = ({
  field: { name, value, onChange, onBlur,style },
  form: { errors, touched },
  id,
  label,

}) => {
 
  return (
    <div>
      
      <FormControlLabel control={
        <Checkbox
          name={name}
          id={id}
          type="checkbox"
          checked={value}
          onChange={onChange}
          onBlur={onBlur}  
          value={value}
          style={style}
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
      } label={label} />
    
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, children,style } = this.props;

    return (
      <div >
        
        <FormLabel component="legend" style={style}>{label}</FormLabel>
        
          <FormGroup  row>
          {React.Children.map(children, child => {
            
            return React.cloneElement(child, {
              
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur,
                style:style
              }
            });
          })}
          </FormGroup>
          {touched && <InputFeedback error={error} />}
      
      </div>
    );
  }
}



function Index(props) {
  const classes = useStyles();
  return (
    <Layout>
      <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        <Card className={classes.card}>
          <CardActionArea disabled>
            <CardMedia component="img" alt="Contemplative Reptile" height="fluid" image={props.data.url || SAD_FACE} title="Contemplative Reptile"/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.data.file_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {JSON.stringify(props.data, null, 4)}
              </Typography>
            </CardContent>
          </CardActionArea>

              <Formik
                initialValues={{
                  developmentGroup: "",
                  washoverVisibilityGroup: "",
                  impactGroup:"",
                  terrianGroup:[],
                }}
                validationSchema={Yup.object().shape({
                  developmentGroup: Yup.string().required("Please select a option"),
                  washoverVisibilityGroup: Yup.string().required("Please select a option"),
                  impactGroup: Yup.string().required("Please select a option"),
                  terrianGroup: Yup.array().required("Please select atleast one option"),
                })}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    
                    axios.post(`http://localhost:4001/form_submit`, values)
                    .then(res => {
                      console.log(res);
                      console.log(res.data);
                    })
                    
                    actions.setSubmitting(false);
                  }, 500);
                }}
                render={({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <CardActions style={MyTheme.palette.grey700BG}>
                      <div>
                        <RadioButtonGroup
                          id="devVsUndev"
                          label="Developed vs Undeveloped"
                          value={values.developmentGroup}
                          error={errors.developmentGroup}
                          touched={touched.developmentGroup}
                          //onChange={handleChange}
                          style={MyTheme.palette.amber500}
                        >
           
                          <Field
                            component={RadioButton}
                            name="developmentGroup"
                            id="DevelopedId"
                            label="Developed"
                          />
                          <Field
                            component={RadioButton}
                            name="developmentGroup"
                            id="UndevelopedId"
                            label="Undeveloped"
                          />
            
                        </RadioButtonGroup>

                        <br/>

                        <RadioButtonGroup
                          id="washoverGroupId"
                          label="Washover Visibility"
                          value={values.washoverVisibilityGroup}
                          error={errors.washoverVisibilityGroup}
                          touched={touched.washoverVisibilityGroup}
                          //onChange={handleChange2}
                          style={MyTheme.palette.blue500}
                        >
           
                          <Field
                            component={RadioButton}
                            name="washoverVisibilityGroup"
                            id="VisibleWashoverId"
                            label="Visible Washover"
                          />
                          <Field
                            component={RadioButton}
                            name="washoverVisibilityGroup"
                            id="NoVisibleWashoverId"
                            label="No Washover"
                          />
                        </RadioButtonGroup>

                        <br/>

                        <RadioButtonGroup
                          id="washoverGroupId"
                          label="Swash"
                          value={values.impactGroup}
                          error={errors.impactGroup}
                          touched={touched.impactGroup}
                          //onChange={handleStomrImpackChange}
                          style={MyTheme.palette.green500}
                        >
           
                          <Field
                            component={RadioButton}
                            name="impactGroup"
                            id="SwashId"
                            label="Swash"
                          />
                          <Field
                            component={RadioButton}
                            name="impactGroup"
                            id="CollisionId"
                            label="Collision"
                          />
                          <Field
                            component={RadioButton}
                            name="impactGroup"
                            id="OverwashId"
                            label="Overwash"
                          />
                          <Field
                            component={RadioButton}
                            name="impactGroup"
                            id="InundationId"
                            label="Inundation"
                          />
            
                        </RadioButtonGroup>

                        <br/>

                        <CheckboxGroup
                          id="terrianGroup"
                          label="Which of these?"
                          value={values.terrianGroup}
                          error={errors.terrianGroup}
                          touched={touched.terrianGroup}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          style={MyTheme.palette.purple800}
                        >
                          <Field
                            component={CheckboxButton}
                            name="terrianGroup"
                            id="River"
                            label="River"
                          />
                          <Field
                            component={CheckboxButton}
                            name="terrianGroup"
                            id="Marsh"
                            label="Marsh"
                          />
                          <Field
                            component={CheckboxButton}
                            name="terrianGroup"
                            id="SandyCoastline"
                            label="Sandy Coastline"
                          />
                        </CheckboxGroup>

                      </div>
                    </CardActions>
              
                    <CardActions style={MyTheme.palette.bluePrimaryBG}>
                      <SkipButton size="small" variant="contained" color="primary" className={classes.margin}>
                          Skip
                      </SkipButton>

                      <SubmitButton disabled={isSubmitting} id="submitButtie" size="small" variant="contained" color="primary" className={classes.toolbarButtons} type="submit">
                          Submit
                      </SubmitButton>
                    </CardActions>
                  </form>
                )}
              />    
        </Card>
      </Grid>
    </Layout>
  );
}

Index.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

Index.getInitialProps = async function() {
  //first get constants
  const CONSTANTS = await require('../server_constants')
  const {SITE_IP} = CONSTANTS
  
  // //This enables it so that the serve either uses localhost or the machines ip,all based off if the user gives a cl arg.
  const API_URL=`http://${SITE_IP.node}/images/get_image`
  //Default data incase Fetch fails. 
  let data,default_data = {
      file_url:undefined,
      file_name:'ERROR API CALL FAILED',
      file_desc: 'BIG SAD',
      api_url:'',
  }
  
  //Now we call the get image api to ,well get the image
  await Fetch(API_URL).then(async function(received_data) { 
      data = await received_data.json()
      
  }).catch(function() {
      //big sad errors
  });

  return {
      data:data || default_data
  }

}

export default Index;

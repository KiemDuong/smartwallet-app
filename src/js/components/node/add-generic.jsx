import React, { Component } from 'react'
// import Radium from 'radium'
// import Reflux from 'reflux'

import AddNodeIcon from 'components/icons/addNode-icon.jsx'
import {Layout, Content} from 'components/layout'
import {
  Card,
  CardMedia,
  TextField,
  List, ListItem,
  FloatingActionButton,
  Divider
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDescription from 'material-ui/svg-icons/action/description'
import SocialShare from 'material-ui/svg-icons/social/share'
import FlatButton from 'material-ui/FlatButton'

export default class NodeAddGeneric extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nodeTitle: ''
    }
    this._handleTitleChange = this._handleTitleChange.bind(this)
    this._handleDescChange = this._handleDescChange.bind(this)
  }

  getStyles() {
    return {
      container: {
        overflowY: 'scroll'
      },
      headerContainer: {
        height: '176px',
        backgroundColor: '#9ca0aa',
        backgroundImage: 'none',
        backgroundSize: 'cover'
      },
      headerIconContainer: {
        height: '176px'
      },
      nodeTitle: {
        padding: '10px 24px',
        color: '#4b132b',
        fontWeight: '100',
        fontSize: '1.5em'
      },
      addBtn: {
        width: '40px',
        boxShadow: 'none',
        marginTop: '27px'
      },
      divider: {
        marginRight: '20px'
      },
      accordionChildren: {
        backgroundColor: '#f7f7f7'
      },
      labelStyle: {
        top: '30px'
      },
      inputStyle: {
        marginTop: '-20px', height: '50px'
      },
      underlineStyle: {
        display: 'none'
      },
      generalAccordion: {
        marginTop: '20px'
      },
      privacyBtn: {
        marginTop: '-10px',
        color: '#fff',
        backgroundColor: '#9a3460'
      },
      fileListIcon: {
        width: '36px',
        height: '36px'
      }
    }
  }

  _handleTitleChange(event) {
    this.setState({
      nodeTitle: event.target.value
    })
  }

  _handleDescChange(event) {
    this.setState({
      nodeDesc: event.target.value
    })
  }

  render() {
    let styles = this.getStyles()
    let headerIcon = <AddNodeIcon height="100%" width="100%" />
    return (
      <Layout>
        <Content>
          <div>
            <Card>
              <CardMedia
                style={styles.headerContainer}
                children={
                  <div style={styles.headerIconContainer}>
                    {headerIcon}
                  </div>
                }
              />
            </Card>
            <TextField
              style={styles.nodeTitle}
              value={this.state.nodeTitle}
              name="nodeTitle"
              placeholder="Add node title"
              onChange={this._handleTitleChange} />
            <List>
              <ListItem
                key={1}
                disabled
                primaryText="File"
                leftIcon={
                  <div style={styles.fileListIcon}>
                    <AddNodeIcon
                      stroke="#9ca0aa" />
                  </div>
                }
                rightIcon={
                  <FloatingActionButton
                    mini
                    secondary
                    style={styles.addBtn}>
                    <ContentAdd />
                  </FloatingActionButton>
                } />
              <Divider style={styles.divider} inset />
            </List>
            <List style={styles.generalAccordion}>
              <ListItem
                primaryText="General"
                primaryTogglesNestedList
                open
                nestedListStyle={styles.accordionChildren}
                nestedItems={[
                  <ListItem
                    key={1}
                    leftIcon={<SocialShare color="#9ba0aa" />}>
                    <FlatButton
                      label="Privacy Settings"
                      style={styles.privacyBtn}
                    />
                  </ListItem>,
                  <ListItem
                    key={2}
                    leftIcon={<ActionDescription color="#9ba0aa" />}>
                    <TextField
                      style={styles.inputStyle}
                      floatingLabelStyle={styles.labelStyle}
                      underlineStyle={styles.underlineStyle}
                      placeholder="Description"
                      name="nodeDesc"
                      value={this.state.nodeDesc}
                      onChange={this._handleDescChange} />
                  </ListItem>
                ]}
              />
            </List>
          </div>
        </Content>
      </Layout>
    )
  }
}

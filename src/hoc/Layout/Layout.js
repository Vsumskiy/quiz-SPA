import React,{Component} from 'react';
import classes from './Layout.module.css'
import MenuToggle from '../../components/navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends Component {
  state={
    menu: false,
  }

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu:false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer 
          isAuthenticated={this.props.isAuthenticated}
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}/>
        <MenuToggle
          onToggle={this.onToggleMenuHandler}
          isOpen={this.state.menu}/>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)

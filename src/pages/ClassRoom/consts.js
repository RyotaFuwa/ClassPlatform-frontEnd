import {setCurrentClass, updateCurrentClass} from "../../redux/class/class.actions";

export const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentClass: state.class.currentClass,
})

export const mapDispatchToProps = dispatch => ({
  setCurrentClass: cls => dispatch(setCurrentClass(cls)),
  updateCurrentClass: updatingFields => dispatch(updateCurrentClass(updatingFields)),
})
export const THEME = new Map([
  ['default', {fontFamily: '"Varela Round", sans-serif', backgroundColor: 'midnightblue', color: 'white'}],
  ['modern', {}],
  ['classic', {}],
  ['mono', {}],
]);



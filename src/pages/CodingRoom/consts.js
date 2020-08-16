import {setCurrentCodingQuestion} from "../../redux/coding/coding.actions";

export const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCodingQuestion: state.coding.currentCodingQuestion,
})

export const mapDispatchToProps = dispatch => ({
  setCurrentCodingQuestion: question => dispatch(setCurrentCodingQuestion(question)),
})

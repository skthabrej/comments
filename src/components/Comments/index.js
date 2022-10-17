import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const backgroundClassNames = ['amber','blue','orange','emerald','teal','red','light-blue',]

let colorCount = -1

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', count: 0}

  onClickDeleteComment = id => {
    const {commentsList, count} = this.state
    const filteredData = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    const changeCount = count - 1
    this.setState({commentsList: filteredData, count: changeCount})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name !== '' && comment !== '') {
      if (colorCount >= backgroundClassNames.length - 1) {
        colorCount = 0
      } else {
        colorCount = colorCount + 1
      }
      const newCommentList = {
        id: uuidv4(),
        name,
        comment,
        color: backgroundClassNames[colorCount],
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newCommentList],
        name: '',
        comment: '',
        count: prevState.count + 1,
      }))
    }
  }

  render() {
    const {commentsList, name, comment, count} = this.state
    return (
      <div>
        <div className="bg-container">
          <div className="container-form">
            <h1 className="heading">Comments</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <input className="name-input" type="text" value={name} onChange={this.onChangeName} placeholder="Your Name"/>
              <br />
              <textarea className="comment-input" type="text" value={comment} onChange={this.onChangeComment} placeholder="Your Comment"/>
              <br />
              <button className="button-style" type="submit">Add Comment</button>
            </form>
          </div>
          <img className="img-style" src="https://i.ibb.co/b19SjRk/increase-employee-motivation-using-rewards.png" alt="comments" />
        </div>
        <hr className="hr-line" />
        <div className="comment-count-container">
          <div className="comments-count">
            <p>{count}</p>
          </div>
          <span className="comment-span">Comments</span>
        </div>
        <ul>
          {commentsList.map(eachComment => (
            <CommentItem key={eachComment.id} commentDetails={eachComment} deleteFunction={this.onClickDeleteComment}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
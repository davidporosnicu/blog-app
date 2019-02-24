import React, { Component } from "react";
import BlogCreator from "./BlogCreator";
import { connect } from "react-redux";
import Post from "./Post";
import uuid from "uuid";

class MainPage extends Component {
  render() {
    const { blogs } = this.props.blogs;

    return (
      <div>
        <div className="ui container">
          <BlogCreator />
        </div>
        <div className="ui container">
          {blogs
            ? blogs.map(blog => {
                return <Post key={uuid()} post={blog} />;
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blog
  };
};

export default connect(mapStateToProps)(MainPage);
